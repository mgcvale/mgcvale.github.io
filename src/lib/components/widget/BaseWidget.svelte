<script lang="ts">
    import { ChevronUp, X } from "lucide-svelte";
    import type { Snippet } from "svelte";
    import { cubicIn, cubicInOut, cubicOut } from "svelte/easing";
    import { scale, slide, type TransitionConfig } from "svelte/transition";
    import type { WidgetPosition } from "../../../service/widgetManager.svelte";
    import { applicationState } from "../../../stores/applicationStore";

    let { 
        pos,
        posMinimized,
        children,
        onClose,
        name,
    }: {
        pos: WidgetPosition,
        posMinimized: WidgetPosition,
        children: Snippet,
        onClose: () => void,
        name: string,
    } = $props();

    let widgetElement: HTMLDivElement;
    let minimized = $state(false);
    let minimizedWidth = $state<number>();
    let controls = $derived($applicationState.language === 'english'
        ? { restore: 'Restore', minimize: 'Minimize', close: 'Close' }
        : { restore: 'Restaurar', minimize: 'Minimizar', close: 'Fechar' });
    let currentPos = $derived(minimized ? posMinimized : pos);
    let currentWidth = $derived(currentPos.w ?? (minimized ? minimizedWidth : undefined));
    const onMinimize = () => {
        if (!minimized) minimizedWidth = widgetElement.getBoundingClientRect().width;
        minimized = !minimized;
    };

    function widgetTransition(node: HTMLElement): TransitionConfig {
        return scale(node, {
            duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200,
            easing: cubicOut,
            start: 0,
        });
    }

    function closeTransition(node: HTMLElement): TransitionConfig {
        return scale(node, {
            duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200,
            easing: cubicIn,
            start: 0,
        });
    }

    function minimizeTransition(node: HTMLElement): TransitionConfig {
        const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 400;
        const layout = slide(node, { duration, easing: cubicInOut });
        const visual = scale(node, { duration, easing: cubicInOut, start: 0.94 });

        return {
            ...layout,
            css: (t, u) => `${layout.css?.(t, u) ?? ''}${visual.css?.(t, u) ?? ''}`
        };
    }

</script>

<div class="widget fixed backdrop-blur-sm rounded-md bg-gray-300/10 dark:bg-gray-600/10 border-black/5 border-2 dark:border-white/10 p-3 py-2" 
    bind:this={widgetElement}
    in:widgetTransition
    out:closeTransition
    style:left={currentPos.anchor === 'top-left' ? `${currentPos.x}px` : 'auto'}
    style:top={currentPos.anchor === 'top-left' ? `${currentPos.y}px` : 'auto'}
    style:bottom={currentPos.anchor === 'bottom-right' ? `${currentPos.y}px` : 'auto'}
    style:right={currentPos.anchor === 'bottom-right' ? `${currentPos.x}px` : 'auto'}
    style:width={currentWidth === undefined ? 'fit-content' : `${currentWidth}px`}
    style:height={currentPos.h === undefined ? 'auto' : `${currentPos.h}px`}
    style:transform-origin={currentPos.anchor === 'bottom-right' ? 'bottom right' : 'top left'}
>
    <div class="flex justify-end items-center w-full px-1.5">
        <h3 class="text-lg">{name}</h3>
        <div class='flex-1 px-2'></div>
        <button
            type="button"
            class="p-1"
            aria-label={`${minimized ? controls.restore : controls.minimize} ${name}`}
            aria-expanded={!minimized}
            onclick={onMinimize}
        >
            <ChevronUp
                size={16}
                class={`transition-transform duration-[400ms] ease-in-out motion-reduce:transition-none ${minimized ? 'rotate-180' : 'rotate-0'}`}
            />
        </button>
        <button type="button" class="pl-1" aria-label={`${controls.close} ${name}`} onclick={onClose}>
            <X size={16} />
        </button>
    </div>
    {#if !minimized}
        <div
            class="pt-2"
            transition:minimizeTransition
            style:transform-origin={currentPos.anchor === 'bottom-right' ? 'bottom right' : 'top left'}
            inert={minimized}
        >
            {@render children()}
        </div>
    {/if}

</div>
