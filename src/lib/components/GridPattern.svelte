<script lang="ts">
    import { cn } from "$lib/util";
    import type {Pair} from "../../stores/metadataStore";
    import {onMount} from "svelte";
    let { className, width = 40, height = 40, x = -1, y = -1, strokeDashArray = "", squares, fillColor = "rgb(156 163 175 / 0.3)", strokeWidth = 1 } = $props();
    let id = crypto.randomUUID().toString().slice(0, 8);
    let scrollQuantity = $state(0);

    function handleWheelEvent(e: WheelEvent) {
        if (e.target === document.body) {
            scrollQuantity = Math.min(2000, Math.max(-1000, scrollQuantity - e.deltaY));
        }

    }

    onMount(() => {
        window.addEventListener("wheel", handleWheelEvent, {passive: false});

        return () => {
            window.removeEventListener("wheel", handleWheelEvent);
        }
    });
</script>

<svg
    style:--scale={2 + scrollQuantity * 0.002}
    aria-hidden="true"
    class={cn(
    "pointer-events-none absolute inset-0 h-full w-full",
    className
  )}
        stroke={fillColor}
        stroke-width={strokeWidth}
>
    <defs>
        <pattern {id} {width} {height} patternUnits="userSpaceOnUse" {x} {y}>
            <path
                    d="M.5 {height}V.5H{width}"
                    fill="none"
                    stroke-dasharray={strokeDashArray}
            />
        </pattern>
    </defs>
    <rect width="100%" height="100%" stroke-width={0} fill="url(#{id})" />
    {#if squares}
        <svg {x} {y} class="overflow-visible">
            {#each squares as sq}
                <rect
                        stroke={fillColor}
                        fill="none"
                        stroke-width="0"
                        width={width - 1}
                        height={height - 1}
                        x={sq[0] * width + 1}
                        y={sq[1] * height + 1}
                />
            {/each}
        </svg>
    {/if}
</svg>
