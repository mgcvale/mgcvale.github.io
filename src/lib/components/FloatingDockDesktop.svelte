<script lang="ts">
    import { Motion, useMotionValue } from "svelte-motion";
    import IconContainer from "$lib/components/IconContainer.svelte";
    import type {DockItem} from "$lib/types";
    import {windowStore} from "../../stores/windowStore.svelte";

    let { items, className } = $props();

    const mouseX = useMotionValue(Infinity);
    const containerX = useMotionValue(0);

    let containerRef: HTMLDivElement;
</script>
  
<!-- svelte-ignore a11y_no_static_element_interactions -->
<Motion let:motion>
<div
    use:motion
    bind:this={containerRef}
    onmouseleave={() => mouseX.set(Infinity)}
    onmousemove={(e) => {
        const rect = containerRef.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX - rect.left);
            containerX.set(rect.x);
        }
    }}
    class="mx-auto flex h-16 gap-4 items-end rounded-full bg-gray-100 dark:bg-neutral-900 px-4 pb-3 border-2 border-gray-200 dark:border-gray-600 drop-shadow-sm {className}"
>
    {#each items as item (item.title)}
        <IconContainer {mouseX} {containerX} {...item}/>
    {/each}
    {#each [...$windowStore] as [title, window]}
        <IconContainer {mouseX} {containerX}
            title={title}
            href=""
            action={window.action}
            bind:dot={window.open}
            icon={window.icon}
        />
    {/each}
</div>
</Motion>

<!--
 * This file contains modified code from the repository:
 * https://github.com/SikandarJODD/svelte-animations, with modifications made by https://github.com/mgcvale.
 * 
 * Licensed under the MIT License (see LICENSE file for details).
-->