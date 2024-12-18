<script lang="ts">
    import {appMetadata, type Pair} from "../../stores/metadataStore";
    import { X, ChevronUp, ChevronDown } from 'lucide-svelte';
    import {windowController} from "../../controller/windowController.svelte.js";
    import {onMount} from "svelte";
    import {Spring} from "svelte/motion";
    
    let { name, children, minimized = $bindable(true) } = $props();

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
            resizeTop.target = 0;
            resizeRight.target = 0;
            resizeLeft.target = 0;
            resizeBottom.target = 0;
            springY.target = $appMetadata.fullscreenSize.y * 0.25;
            springX.target = $appMetadata.fullscreenSize.x * 0.25;
            width = $appMetadata.fullscreenSize.x * 0.5;
            height = $appMetadata.fullscreenSize.y * 0.5;
        }
    }

    onMount(() => {
        fullscreenModeChanged = true;
        toDefaultSize();

        const unsubscribe1 = windowController.focusNotifier.subscribe(() => {
            section.style.zIndex = '0';
        });

        section.onmousedown = (e: MouseEvent) => {
            if (windowController.altDown) {
                e.preventDefault();
            }
            windowController.focusNotifier.notify();
            section.style.zIndex = '99';

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

        dragElement.onmousedown = (e: MouseEvent) => {
            windowController.focusNotifier.notify();
            section.style.zIndex = '99';

            initialHeaderX = e.clientX - springX.current;
            initialHeaderY = e.clientY - springY.current;
        };

        const unsubscribe2 = windowController.mouseCoords.subscribe((newcoords: Pair) => {
            if (dragElement.matches(":active")) {
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
            element.onmousedown = (e: MouseEvent) => {
                e.preventDefault();
                isResizing = true;
                resizeDirection = direction;
                resizePositionX = e.offsetX;
                resizePositionY = e.offsetY;
            };
        });

        function mouseup(e: MouseEvent) {
            isResizing = false;

            if (e.button === 0)
                sectionMouseDown = false;
            else if (e.button === 2)
                sectionRightMouseDown = false;
        }

        window.addEventListener('mouseup', mouseup);

        return () => {
            unsubscribe1();
            unsubscribe2();
            window.removeEventListener('mouseup', mouseup);
        }
    });

</script>

<section class:minimized={minimized} style:--cursor={(windowController.altDown && sectionMouseDown) ? "grab" : "default"}
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
            <X class="hover:scale-125 transition-all active:scale-100" size={16}/>
        </div>
    </header>
    <div class="window-content disable-scroll-effectsz flex-grow bg-neutral-200 dark:bg-neutral-700 p-2 overflow-x-scroll">
        {@render children()}
    </div>

    <!-- resizing handles -->
    <div bind:this={northHandle} class="absolute top-0 left-0 right-0 h-1 cursor-ns-resize"></div>
    <div bind:this={southHandle} class="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize"></div>
    <div bind:this={eastHandle} class="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize"></div>
    <div bind:this={westHandle} class="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize"></div>

    <div bind:this={northwestHandle} class="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize"></div>
    <div bind:this={northeastHandle} class="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize"></div>
    <div bind:this={southwestHandle} class="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize"></div>
    <div bind:this={southeastHandle} class="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"></div>

    <div bind:this={altNorthwestHandle} style:--display={windowController.altDown && sectionRightMouseDown ? "block" : "none"} class="alt-handle absolute top-0 left-0 w-1/2 h-1/2 cursor-nwse-resize"></div>
    <div bind:this={altNortheastHandle} style:--display={windowController.altDown && sectionRightMouseDown ? "block" : "none"} class="alt-handle absolute top-0 right-0 w-1/2 h-1/2 cursor-nesw-resize"></div>
    <div bind:this={altSouthwestHandle} style:--display={windowController.altDown && sectionRightMouseDown ? "block" : "none"} class="alt-handle absolute bottom-0 left-0 w-1/2 h-1/2 cursor-nesw-resize"></div>
    <div bind:this={altSoutheastHandle} style:--display={windowController.altDown && sectionRightMouseDown ? "block" : "none"} class="alt-handle absolute bottom-0 right-0 w-1/2 h-1/2 cursor-nwse-resize"></div>
</section>

<style lang="scss">
    .window-section {
        top: var(--top);
        left: var(--left);
        height: var(--height);
        width: var(--width);
        cursor: var(--cursor);
    }

    .alt-handle {
        display: var(--display);
    }

    section {
      transition: opacity 700ms, transform 700ms;
      transition-timing-function: cubic-bezier(0.45, -0.5, 0.5, 1);
    }

    section.minimized {
        transform: scale(0);
        opacity: 0;
    }
</style>