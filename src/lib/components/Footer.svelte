<script lang="ts">
    import FloatingDockDesktop from "$lib/components/FloatingDockDesktop.svelte";
    import type {DockItem} from "$lib/types";
    import { SwatchBook } from 'lucide-svelte';
    import MobileLauncher from "$lib/components/MobileLauncher.svelte";
    import { applicationState } from "$lib/../stores/applicationStore";

    let { ref = $bindable() } = $props();

    let items: DockItem[] = [
        {
            icon: SwatchBook,
            href: "#",
            title: "Change theme",
            smallTitle: "Theme",
            action: changeTheme,
        },
    ]

    function changeTheme() {
        if (document.querySelector("html")?.classList.contains("dark")) {
            document.querySelector("html")?.classList.remove("dark");
        } else {
            document.querySelector("html")?.classList.add("dark");
        }
    }
</script>

<footer bind:this={ref} id="footer" class="fixed w-full flex justify-center align-middle bottom-0 my-4" style="z-index: 999">
    {#if !$applicationState.isTouchscreen}
        <FloatingDockDesktop {items} className={"drop-shadow-md dock-desktop"}/>
    {/if}
</footer>
{#if $applicationState.isTouchscreen}
    <MobileLauncher {items} />
{/if}

<style lang="scss">

</style>