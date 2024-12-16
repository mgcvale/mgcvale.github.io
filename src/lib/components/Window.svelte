<script lang="ts">
    import {appMetadata, type Pair} from "../../stores/metadataStore";
    import { X, ChevronUp, ChevronDown } from 'lucide-svelte';
    import {windowController} from "../../stores/windowController";
    import {onMount} from "svelte";
    import {Spring} from "svelte/motion";
    
    let { name, content } = $props();
    let fullscreen: boolean = $state(false);
    let fullscreenModeChanged: boolean = true;
    let section: HTMLElement;
    let dragElement: HTMLElement;
    let header: HTMLElement;

    let dragX = 0;
    let dragY = 0;
    let springX = new Spring(0);
    let springY = new Spring(0);
    let movingWindow: boolean = $state(false);

    $effect(() => {
        if (fullscreen) {
            section.style.top = `${$appMetadata.fullscreenCoords.y}px`;
            section.style.left = `${$appMetadata.fullscreenCoords.x}px`;
            section.style.width = `${$appMetadata.fullscreenSize.x - parseInt(window.getComputedStyle(section).marginLeft) * 2}px`;
            section.style.height = `${$appMetadata.fullscreenSize.y - parseInt(window.getComputedStyle(section).marginBottom)}px`;
        } else {
            toDefaultSize();
            fullscreenModeChanged = false;
        }
    });

    function toDefaultSize() {
        if (fullscreenModeChanged) {
            springY.set($appMetadata.fullscreenSize.y * 0.25);
            springX.set($appMetadata.fullscreenSize.x * 0.25);
            section.style.width = `${$appMetadata.fullscreenSize.x * 0.5}px`;
            section.style.height = `${$appMetadata.fullscreenSize.y * 0.5}px`;
        }
    }

    onMount(() => {
        fullscreenModeChanged = true;
        toDefaultSize();

        dragElement.onmousedown = (e: MouseEvent) => {
            movingWindow = true;
            windowController.focusNotifier.notify();
            section.style.zIndex = '99';
            dragX = e.offsetX + 2 * parseInt(window.getComputedStyle(header).paddingLeft) + 15;
            dragY = e.offsetY + 3;
        };

        const unsubscribe1 = windowController.mouseUpNotifier.subscribe(() => {
            movingWindow = false;
        });

        const unsubscribe2 = windowController.mouseCoords.subscribe((newcoords: Pair) => {
            if (movingWindow) {
                console.log("changing target to ", newcoords); // this always logs as it should
                springY.target = newcoords.y - dragY;
                springX.target = newcoords.x - dragX;
            }
        });

        const unsubscribe3 = windowController.focusNotifier.subscribe(() => {
            section.style.zIndex = '0';
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
            unsubscribe3();
        }
    });

</script>

<section style:--top={`${springY.current}px`} style:--left={`${springX.current}px`} bind:this={section} class="window-section drop-shadow-xl fixed flex flex-col align-top justify-start border-3 border-white dark:border-neutral-900 rounded-lg mx-4 my-2 mt-0 overflow-hidden">
    <header bind:this={header} class="flex justify-between items-center flex-grow-0 bg-white dark:bg-neutral-900 overflow-hidden px-1 text-center pb-1">
        <div bind:this={dragElement} class="drag-area flex-grow h-full cursor-move">
            <h3 class="orbitron text-sm text-left select-none">{name}</h3>
        </div>
        <div class="flex flex-grow-0 gap-0.5 [&>*]:cursor-pointer">
            <ChevronUp onclick={() => { fullscreen = !fullscreen; fullscreenModeChanged = true }} class="hover:scale-125 transition-all active:scale-100"  size={16} />
            <ChevronDown class="hover:scale-125 transition-all active:scale-100"  size={16} />
            <X class="hover:scale-125 transition-all active:scale-100" size={16} />
        </div>
    </header>
    <div class="window-content flex-grow bg-neutral-200 dark:bg-neutral-700 p-2">
        {@render content()}
    </div>
</section>