<script lang="ts">
    import FloatingDockDesktop from "$lib/components/FloatingDockDesktop.svelte";
    import type {DockItem} from "$lib/types";
    import { SwatchBook } from 'lucide-svelte';

    let { ref = $bindable() } = $props();

    let items: DockItem[] = [
        {
            icon: SwatchBook,
            href: "#",
            title: "Change theme",
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

<footer bind:this={ref} id="footer" class="fixed bottom-0 w-full flex justify-center align-middle m-4" style="z-index: 999">
    <FloatingDockDesktop {items} className={"drop-shadow-md"}/>
</footer>

<style lang="scss">

</style>