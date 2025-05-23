<script lang="ts">
    import {appMetadata, type Pair} from "../../stores/metadataStore";
    import { X, ChevronUp, ChevronDown } from 'lucide-svelte';
    import {windowController} from "../../service/windowController.svelte.js";
    import {onMount} from "svelte";
    import {Spring} from "svelte/motion";
    import {applicationState} from "../../stores/applicationStore";
    
    let { name, children, minimized = $bindable(true), close, onclick, zIndex = $bindable(0) } = $props();

    // fullscreen stuff
    let fullscreen: boolean = $state(false);
    let fullscreenModeChanged: boolean = true;

    // two main drag elements
    let section: HTMLElement;
    let dragElement: HTMLElement;

    // some states
    let isResizing = $state(false);
    let resizeDirection: string = $state('');
    let sectionMouseDown: boolean = $state(false);
    let sectionRightMouseDown: boolean = $state(false);
    let dragElementTouchDown = false;

    // window dimensions and coordinates
    let height: number = $state(0);
    let width: number = $state(0);
    let springX = new Spring(0);
    let springY = new Spring(0);

    // window resize factors
    let resizeTop: Spring<number> = new Spring(0);
    let resizeRight: Spring<number> = new Spring(0);
    let resizeLeft: Spring<number> = new Spring(0);
    let resizeBottom: Spring<number> = new Spring(0);

    // offsetX and offsetY of resize and move handles
    let initialHeaderX = 0;
    let initialHeaderY = 0;
    let initialSectionX = 0;
    let initialSectionY = 0;
    let resizePositionX = 0;
    let resizePositionY = 0;

    // resize handles
    let northHandle: HTMLElement, southHandle: HTMLElement, eastHandle: HTMLElement, westHandle: HTMLElement;
    let northeastHandle: HTMLElement, northwestHandle: HTMLElement, southeastHandle: HTMLElement, southwestHandle: HTMLElement;
    let altNortheastHandle: HTMLElement, altNorthwestHandle: HTMLElement, altSoutheastHandle: HTMLElement, altSouthwestHandle: HTMLElement;

    $effect(() => {
        if (fullscreen) {
            resizeTop.target = 0;
            resizeRight.target = 0;
            resizeLeft.target = 0;
            resizeBottom.target = 0;
            springY.target = $appMetadata.fullscreenCoords.y;
            springX.target = $appMetadata.fullscreenCoords.x;
            width = $appMetadata.fullscreenSize.x - parseInt(window.getComputedStyle(section).marginLeft) * 2;
            height = $appMetadata.fullscreenSize.y - parseInt(window.getComputedStyle(section).marginBottom);
        } else {
            toDefaultSize();
            fullscreenModeChanged = false;
        }
    });

    function toDefaultSize() {
        if (fullscreenModeChanged) {
            if ($applicationState.isTouchscreen) fullscreen = true;
            resizeTop.target = 0;
            resizeRight.target = 0;
            resizeLeft.target = 0;
            resizeBottom.target = 0;
            springY.target = $appMetadata.fullscreenSize.y * 0.2;
            springX.target = $appMetadata.fullscreenSize.x * 0.25;
            width = $appMetadata.fullscreenSize.x * 0.5;
            height = $appMetadata.fullscreenSize.y * 0.6;
        }
    }

    const dragElementMousedown = (e: MouseEvent | TouchEvent) => {
        if (e instanceof MouseEvent) {
            initialHeaderX = e.clientX - springX.current;
            initialHeaderY = e.clientY - springY.current;
        } else {
            initialHeaderX = e.touches[0].clientX - springX.current;
            initialHeaderY = e.touches[0].clientY - springY.current;
            dragElementTouchDown = true;
        }
    }

    onMount(() => {
        fullscreenModeChanged = true;
        toDefaultSize();

        section.onmousedown = (e: MouseEvent) => {
            onclick();

            if (windowController.altDown) {
                e.preventDefault();
            }

            if (e.button === 0)
                sectionMouseDown = true;
            else if (e.button === 2)
                sectionRightMouseDown = true;
            initialSectionX = e.clientX - springX.current;
            initialSectionY = e.clientY - springY.current;
        };

        section.oncontextmenu = (e: MouseEvent) => {
            if (windowController.altDown) {
                e.preventDefault();
            }
        }

        dragElement.onmousedown = dragElementMousedown;
        dragElement.ontouchstart = dragElementMousedown;

        const unsubscribe2 = windowController.mouseCoords.subscribe((newcoords: Pair) => {
            if (dragElement.matches(":active") || dragElementTouchDown) {
                springY.target = newcoords.y - initialHeaderY;
                springX.target = newcoords.x - initialHeaderX;
            } else if (windowController.altDown) {
                if (sectionMouseDown) {
                    springY.target = newcoords.y - initialSectionY;
                    springX.target = newcoords.x - initialSectionX;
                }
            }

            const currentX = springX.current;
            const currentY = springY.current;

            if (isResizing) {
                if (resizeDirection.includes('n')) {
                    resizeTop.target = currentY - newcoords.y + resizePositionY;
                }
                if (resizeDirection.includes('s')) {
                    resizeBottom.target = currentY - newcoords.y + height - resizePositionY;
                }
                if (resizeDirection.includes('e')) {
                    resizeRight.target = newcoords.x - currentX - width - resizePositionX;
                }
                if (resizeDirection.includes('w')) {
                    resizeLeft.target = newcoords.x - currentX - 16 - resizePositionX; // i have no idea why it needs this 8. Without it it offsets the resize to the left.
                }
            }
        });

        // resizing
        const resizeHandles = [
            { direction: 'n', element: northHandle },
            { direction: 's', element: southHandle },
            { direction: 'e', element: eastHandle },
            { direction: 'w', element: westHandle },
            { direction: 'nw', element: northwestHandle },
            { direction: 'ne', element: northeastHandle },
            { direction: 'sw', element: southwestHandle },
            { direction: 'se', element: southeastHandle },
        ];

        const altResizeHandles = [
            { direction: 'nw', element: altNorthwestHandle },
            { direction: 'ne', element: altNortheastHandle },
            { direction: 'sw', element: altSouthwestHandle },
            { direction: 'se', element: altSoutheastHandle },
        ]

        resizeHandles.forEach(({ direction, element }) => {
            const onSomethingDown = (e: MouseEvent | TouchEvent) => {
                e.preventDefault();
                isResizing = true;
                resizeDirection = direction;
                if (e instanceof MouseEvent) {
                    resizePositionX = e.offsetX;
                    resizePositionY = e.offsetY;
                } else {
                    const touch = e.touches[0];
                    const rect = element.getBoundingClientRect();

                    resizePositionX = touch.clientX - rect.left;
                    resizePositionY = touch.clientY - rect.top;
                }
            }

            element.onmousedown = onSomethingDown;
            element.ontouchstart = onSomethingDown;
        });

        altNortheastHandle.onmousedown = (e: MouseEvent) => {
            if (e.button !== 2) {
                return;
            }
            e.preventDefault();
            if (windowController.altDown) {
                isResizing = true;
                resizeDirection = 'ne';
                resizePositionX = e.offsetX - altNortheastHandle.getBoundingClientRect().width;
                resizePositionY = e.offsetY;
            }
        }
        altNorthwestHandle.onmousedown = (e: MouseEvent) => {
            if (e.button !== 2) {
                return;
            }
            e.preventDefault();
            if (windowController.altDown) {
                isResizing = true;
                resizeDirection = 'nw';
                resizePositionX = e.offsetX;
                resizePositionY = e.offsetY;
            }
        }
        
        altSoutheastHandle.onmousedown = (e: MouseEvent) => {
            if (e.button !== 2) {
                return;
            }
            e.preventDefault();
            if (windowController.altDown) {
                isResizing = true;
                resizeDirection = 'se';
                const boundingRect: DOMRect = altSoutheastHandle.getBoundingClientRect();
                resizePositionX = e.offsetX - boundingRect.width;
                resizePositionY = boundingRect.height - e.offsetY;
            }
        }
        altSouthwestHandle.onmousedown = (e: MouseEvent) => {
            if (e.button !== 2) {
                return;
            }
            e.preventDefault();
            if (windowController.altDown) {
                isResizing = true;
                resizeDirection = 'sw';
                resizePositionX = e.offsetX;
                resizePositionY = altSouthwestHandle.getBoundingClientRect().height - e.offsetY;
            }
        }


        function mouseup(e: MouseEvent) {
            isResizing = false;

            if (e.button === 0)
                sectionMouseDown = false;
            else if (e.button === 2)
                sectionRightMouseDown = false;
        }

        function touchend() {
            isResizing = false;
            dragElementTouchDown = false;
        }

        window.addEventListener('mouseup', mouseup);
        window.addEventListener('touchend', touchend);

        return () => {
            unsubscribe2();
            window.removeEventListener('mouseup', mouseup);
            window.removeEventListener('touchend', touchend);
        }
    });

</script>

<section style:--z-index={zIndex} class:minimized={minimized}
         style:--top={`${springY.current - resizeTop.current}px`} style:--left={`${springX.current + resizeLeft.current}px`}
         style:--width={`${width + resizeRight.current - resizeLeft.current}px`} style:--height={`${height + resizeTop.current - resizeBottom.current}px`}
         bind:this={section} class="window-section drop-shadow-xl fixed flex flex-col align-top justify-start border-3 border-white dark:border-neutral-900 rounded-lg mx-4 my-2 mt-0 overflow-hidden">
    <header class="flex justify-end items-center flex-grow-0 bg-white dark:bg-neutral-900 px-1 text-center pb-1">
        <div bind:this={dragElement} class="drag-area flex-grow cursor-move">
            <h3 class="orbitron text-sm text-left select-none">{name}</h3>
        </div>
        <div class="flex flex-grow-0 gap-0.5 [&>*]:cursor-pointer pr-1">
            <ChevronUp onclick={() => { fullscreen = !fullscreen; fullscreenModeChanged = true }} class="hover:scale-125 transition-all active:scale-100"  size={16} />
            <ChevronDown onclick={() => minimized=true} class="hover:scale-125 transition-all active:scale-100"  size={16} />
            <X  onclick={() => close()} class="hover:scale-125 transition-all active:scale-100" size={16}/>
        </div>
    </header>
    <div class="window-content disable-scroll-effectsz flex-grow bg-neutral-200 dark:bg-neutral-800 overflow-x-scroll">
        {@render children()}
    </div>

    <!-- resizing handles -->
    <div bind:this={altNorthwestHandle} style:--display={windowController.altDown ? 'block' : 'none'} style:--cursor={windowController.altDown && sectionRightMouseDown ? 'nwse-resize' : sectionMouseDown ? 'grab' : 'default'} class="alt-handle absolute top-0 left-0 w-1/2 h-1/2 cursor-nwse-resize"></div>
    <div bind:this={altNortheastHandle} style:--display={windowController.altDown ? 'block' : 'none'} style:--cursor={windowController.altDown && sectionRightMouseDown ? 'nesw-resize' : sectionMouseDown ? 'grab' : 'default'} class="alt-handle absolute top-0 right-0 w-1/2 h-1/2 cursor-nesw-resize"></div>
    <div bind:this={altSouthwestHandle} style:--display={windowController.altDown ? 'block' : 'none'} style:--cursor={windowController.altDown && sectionRightMouseDown ? 'nesw-resize' : sectionMouseDown ? 'grab' : 'default'} class="alt-handle absolute bottom-0 left-0 w-1/2 h-1/2 cursor-nesw-resize"></div>
    <div bind:this={altSoutheastHandle} style:--display={windowController.altDown ? 'block' : 'none'} style:--cursor={windowController.altDown && sectionRightMouseDown ? 'nwse-resize' : sectionMouseDown ? 'grab' : 'default'} class="alt-handle absolute bottom-0 right-0 w-1/2 h-1/2 cursor-nwse-resize"></div>

    <div bind:this={northHandle} class="absolute top-0 left-0 right-0 h-1 cursor-ns-resize"></div>
    <div bind:this={southHandle} class="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize"></div>
    <div bind:this={eastHandle} class="absolute -right-1.5 top-0 bottom-0 w-3 cursor-ew-resize"></div>
    <div bind:this={westHandle} class="absolute -left-1.5 top-0 bottom-0 w-3 cursor-ew-resize"></div>

    <div bind:this={northwestHandle} class="absolute -top-1 -left-1 w-4 h-4 cursor-nwse-resize"></div>
    <div bind:this={northeastHandle} class="absolute -top-2 -right-2 w-4 h-4 cursor-nesw-resize"></div>
    <div bind:this={southwestHandle} class="absolute -bottom-1 -left-1 w-4 h-4 cursor-nesw-resize"></div>
    <div bind:this={southeastHandle} class="absolute -bottom-1 -right-1 w-4 h-4 cursor-nwse-resize"></div>
</section>

<style lang="scss">
    .window-section {
        top: var(--top);
        left: var(--left);
        height: var(--height);
        width: var(--width);
    }

    .alt-handle {
        display: var(--display);
        cursor: var(--cursor);
    }

    section {
      z-index: var(--z-index);
      transition: opacity 700ms, transform 700ms;
      transition-timing-function: cubic-bezier(0.45, -0.5, 0.5, 1);
    }

    section.minimized {
        transform: scale(0);
        opacity: 0;
    }
</style>