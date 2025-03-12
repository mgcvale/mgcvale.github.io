<script lang="ts">
    import {windowManager} from "../../service/windowManager.svelte";

    let { items } = $props();

    function onTouchStart(event: Event) {
        const target = event.currentTarget as HTMLElement;
        target.classList.add("scaled");
        setTimeout(() => {
            target.classList.remove("scaled");
        }, 500);
    }
    function onTouchEnd(event: Event) {
        const target = event.currentTarget as HTMLElement;
        setTimeout(() => {
            target.classList.remove("scaled");
        }, 60);
    }

</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="hidden scaled"></div>
<div class="grid-container">
    {#each items as item, idx}
        <a
                class="grid-item active:scale-100"
                onclick={item.action}
                href={item.href}
                ontouchstart={e => onTouchStart(e)}
                ontouchend={e => onTouchEnd(e)}
        >
            <div class="icon-wrapper  dark:bg-neutral-900 bg-neutral-200 border-2 border-neutral-300 dark:border-neutral-700 p-2 rounded-lg text-neutral-600 dark:text-neutral-300">
                <svelte:component this={item.icon}></svelte:component>
            </div>
            <p class="text-neutral-700 dark:text-neutral-300">{item.smallTitle}</p>
        </a>
    {/each}
    {#each windowManager.allWindows() as window}
        <a
                class="grid-item"
                onclick={window.action}
                ontouchstart={e => onTouchStart(e)}
                ontouchend={e => onTouchEnd(e)}
        >
            <div class="icon-wrapper  dark:bg-neutral-900 bg-neutral-200 border-2 border-neutral-300 dark:border-neutral-700 p-2 rounded-lg text-neutral-600 dark:text-neutral-300">
                <svelte:component this={window.icon}></svelte:component>
            </div>
            <p class="text-neutral-700 dark:text-neutral-300">{window.smallName}</p>
        </a>
    {/each}
</div>

<style lang="scss">
    .grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(66px, 1fr));
        gap: 16px;
        padding: 20px;
        justify-content: start;
    }

    .grid-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        transition: 200ms;
    }

    .scaled {
      transform: scale(0.9);
    }

    .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>