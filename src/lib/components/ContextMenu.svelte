<script module lang="ts">
    export type ContextMenuEntry = {
        englishName: string,
        portugueseName: string,
        subItems?: ContextMenuEntry[],
        onAction: () => void,
    };
</script>

<script lang="ts">
    import { ChevronRight } from 'lucide-svelte';
    import { cubicIn } from 'svelte/easing';
    import { scale } from 'svelte/transition';
    import { applicationState } from '../../stores/applicationStore';
    import { windowManager } from '../../service/windowManager.svelte';

    let { entries, open = $bindable(false), x = 0, y = 0 }: {
        entries: ContextMenuEntry[],
        open?: boolean,
        x?: number,
        y?: number,
    } = $props();

    let menu: HTMLDivElement | undefined = $state();
    let width = $state(0);
    let height = $state(0);
    let viewportWidth = $state(0);
    let viewportHeight = $state(0);
    let left = $derived(Math.max(8, Math.min(
        x + width > viewportWidth - 8 ? x - width : x,
        viewportWidth - width - 8,
    )));
    let top = $derived(Math.max(8, Math.min(y, viewportHeight - height - 8)));
    let zIndex = $derived(Math.max(1000, ...windowManager.getWindowlist().map(window => window.zIndex + 1)));

    function dismiss(event: PointerEvent) {
        if (open && event.target instanceof Node && !menu?.contains(event.target)) open = false;
    }

    function activate(entry: ContextMenuEntry) {
        if (entry.subItems?.length) return;
        open = false;
        entry.onAction();
    }

    function closeMenu(node: HTMLElement) {
        return scale(node, {
            duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200,
            easing: cubicIn,
            start: 0,
        });
    }

    function positionSubmenu(node: HTMLLIElement) {
        function updatePosition() {
            const submenu = node.querySelector<HTMLDivElement>(':scope > .submenu');
            if (!submenu) return;

            // Layout offsets stay stable while menus animate their scale.
            let right = left + node.offsetWidth;
            let ancestor: HTMLElement | null = node;
            while (ancestor && ancestor !== menu) {
                right += ancestor.offsetLeft;
                const parent: HTMLElement | null = ancestor.offsetParent as HTMLElement | null;
                right += parent?.clientLeft ?? 0;
                ancestor = parent;
            }

            node.dataset.opensLeft = String(right + submenu.offsetWidth > window.innerWidth - 8);
        }

        node.addEventListener('mouseenter', updatePosition);
        node.addEventListener('focusin', updatePosition);

        return {
            destroy() {
                node.removeEventListener('mouseenter', updatePosition);
                node.removeEventListener('focusin', updatePosition);
            }
        };
    }

</script>

<svelte:window
    bind:innerWidth={viewportWidth}
    bind:innerHeight={viewportHeight}
    onpointerdown={dismiss}
    onkeydown={(event) => { if (event.key === 'Escape') open = false; }}
/>

{#snippet renderEntries(items: ContextMenuEntry[])}
    <ul class="menu relative w-max min-w-[min(10rem,calc(100vw-16px))] max-w-[calc(100vw-16px)] list-none rounded-lg border-2 border-black/5 dark:border-white/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:backdrop-blur-xs bg-neutral-300/10 dark:bg-neutral-600/20 text-neutral-700 dark:text-neutral-200 p-1">
        {#each items as entry}
            <li
                use:positionSubmenu
                class="menu-entry relative
                    [&:is(:hover,:focus-within)>.submenu]:visible
                    [&:is(:hover,:focus-within)>.submenu]:pointer-events-auto
                    [&:is(:hover,:focus-within)>.submenu]:scale-100
                    [&:is(:hover,:focus-within)>.submenu]:opacity-100
                    [&:is(:hover,:focus-within)>.submenu]:ease-[cubic-bezier(0.22,1,0.36,1)]
                    [&[data-opens-left=true]>.submenu]:left-auto
                    [&[data-opens-left=true]>.submenu]:right-full
                    [&[data-opens-left=true]>.submenu]:origin-top-right
                    [&[data-opens-left=true]>button>svg]:rotate-180"
            >
                <button
                    type="button"
                    class="flex w-full items-center justify-between gap-4 rounded-md px-2 py-1 text-left text-sm hover:bg-black/5 dark:hover:bg-white/10 focus-visible:bg-black/5 dark:focus-visible:bg-white/10"
                    aria-haspopup={entry.subItems?.length ? true : undefined}
                    onclick={() => activate(entry)}
                >
                    <span>{$applicationState.language === 'english' ? entry.englishName : entry.portugueseName}</span>
                    {#if entry.subItems?.length}
                        <ChevronRight size={16} class="shrink-0" />
                    {/if}
                </button>
                {#if entry.subItems?.length}
                    <div class="submenu invisible pointer-events-none absolute left-full px-1 -top-1.5 origin-top-left scale-0 opacity-0 motion-safe:transition-[transform,opacity,visibility] motion-safe:duration-200 motion-safe:ease-in">
                        {@render renderEntries(entry.subItems)}
                    </div>
                {/if}
            </li>
        {/each}
    </ul>
{/snippet}

{#if open}
    <div
        class="context-menu fixed w-max motion-safe:animate-menu-open"
        bind:this={menu}
        bind:clientWidth={width}
        bind:clientHeight={height}
        out:closeMenu
        style:left={`${left}px`}
        style:top={`${top}px`}
        style:z-index={zIndex}
        style:transform-origin={`${x - left}px ${y - top}px`}
    >
        {@render renderEntries(entries)}
    </div>
{/if}

