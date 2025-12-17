<script lang="ts">
    import FloatingDockDesktop from "$lib/components/FloatingDockDesktop.svelte";
    import type {DockItem} from "$lib/types";
    import { Languages, SwatchBook } from 'lucide-svelte';
    import MobileLauncher from "$lib/components/MobileLauncher.svelte";
    import { applicationState } from "$lib/../stores/applicationStore";

    let { ref = $bindable() } = $props();

    let items: DockItem[] = $state([
        {
            id: 128,
            icon: SwatchBook,
            href: "#",
            title: "Change theme",
            smallTitle: "Theme",
            action: changeTheme,
        },
        {
            id: 129,
            icon: Languages,
            href: "#",
            title: "Change language",
            smallTitle: "language",
            action: () => {
                if ($applicationState.language === "english") {
                    $applicationState.language = "portuguese";
                } else {
                    $applicationState.language = "english";
                }
            }
        }
    ]);

    $effect(() => {
        switch ($applicationState.language) {
            case "english":
                items[0].title = "Change Theme";
                items[0].smallTitle = "Theme";
                items[1].title = "Change language";
                items[1].title = "Language";
                break;
            case "portuguese":
                items[0].title = "Trocar Tema";
                items[0].smallTitle = "Tema";
                items[1].title = "Trocar idioma";
                items[1].title = "Idioma";
        }
    })

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
        <FloatingDockDesktop bind:items={items} className={"drop-shadow-md dock-desktop"}/>
    {/if}
</footer>
{#if $applicationState.isTouchscreen}
    <MobileLauncher bind:items={items} />
{/if}

<style lang="scss">

</style>