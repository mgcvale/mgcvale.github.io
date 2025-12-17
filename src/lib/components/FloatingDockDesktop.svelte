<script lang="ts">
    import { Motion, useMotionValue } from "svelte-motion";
    import IconContainer from "$lib/components/IconContainer.svelte";
    import { windowManager } from "../../service/windowManager.svelte.js";

    let { items = $bindable(), className } = $props();

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
    {#each items as item (item.id)}
        <IconContainer {mouseX} {containerX} {...item}/>
    {/each}
    {#each windowManager.getWindowlist() as window}
        <IconContainer {mouseX} {containerX}
            title={window.name}
            href=""
            action={() => {
                windowManager.windowActionPerformed(window);
            }}
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