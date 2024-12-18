<script lang="ts">
    import FloatingDockDesktop from "$lib/components/FloatingDockDesktop.svelte";
    import FloatingDockMobile from "$lib/components/FloatingDockMobile.svelte";
    import type {DockItem} from "$lib/types";
    import { SwatchBook } from 'lucide-svelte';
    import {windowStore} from "../../stores/windowStore";

    let { ref = $bindable() } = $props();

    let items: DockItem[] = [
        {
            icon: SwatchBook,
            href: "#",
            title: "Change theme",
            action: changeTheme,
            dot: false,
        },
    ]

    for (let i = 0; i < $windowStore.length; i++) {
        const window = $windowStore[i];
        items.push({
            icon: window.icon,
            href: '',
            title: window.title,
            action: () => {
                $windowStore[i].open = true;
                setTimeout(() => {
                    $windowStore[i].minimized = false;
                }, 150);
            }
        })
    }

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
    <FloatingDockMobile {items} />
</footer>

<style lang="scss">

</style>