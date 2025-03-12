<script lang="ts">
    import "/src/style/main.scss";
    import { Footer, Header, Window, GridPattern } from '$lib/components';
    import { AboutWindow, ProjectsWindow } from '$lib/components/windows';
    import { appMetadata } from '../stores/metadataStore';
    import { windowController } from "../service/windowController.svelte.js";
    import {WindowEntry, windowManager } from "../service/windowManager.svelte.js";

    import {Info, TriangleAlert, Lightbulb, GlobeIcon, NotebookPen} from "lucide-svelte";


    import {onMount} from "svelte";
    import Modal from "$lib/components/Modal.svelte";
    import {modalStore} from "../stores/modalStore";
    import TouchscreenWarningModal from "$lib/components/TouchscreenWarningModal.svelte";
    import BrowserWindow from "$lib/components/windows/BrowserWindow.svelte";
    import BlogsWindow from "$lib/components/windows/ArticlesWindow.svelte";

    let header: HTMLElement;
    let footer: HTMLElement;

    onMount(() => {
        windowController.initialize(window);

        const onresize = () => {
            if (!header || !footer) {
                  console.error("Error calculating fullscreen size");
                  return;
            }

            const headerStyle = window.getComputedStyle(header);
            const headerMargin = parseInt(headerStyle.marginTop) + parseInt(headerStyle.marginBottom);

            appMetadata.update((metadata) => ({
                fullscreenCoords: {
                    x: 0,
                    y: header.offsetHeight + headerMargin
                },
                fullscreenSize: {
                    x: window.innerWidth,
                    y: window.innerHeight - header.offsetHeight - headerMargin
                }
            }));
        }
        window.addEventListener("resize", onresize);
        onresize();

        // check for touchscreens, and display a warning in case
        if(window.matchMedia("(pointer: coarse)").matches && localStorage.getItem('dontWarnTouchscreen') === null) {
            // touchscreen
            modalStore.set(TouchscreenWarningModal);
        }

        return () => {
            window.removeEventListener("resize", onresize);
        }

    });

    const windows: Map<string, WindowEntry> = new Map();
    windowManager.addWindow(new WindowEntry(
        "About",
        AboutWindow,
        false,
        true,
        Info
    ));
    windowManager.addWindow(new WindowEntry(
        "Projects",
        ProjectsWindow,
        false,
        true,
        Lightbulb
    ));
    windowManager.addWindow(new WindowEntry(
        "Web Browser",
        BrowserWindow,
        false,
        true,
        GlobeIcon
    ));
    windowManager.addWindow(new WindowEntry(
        "Articles",
        BlogsWindow,
        false,
        true,
        NotebookPen
    ));

</script>

<Header bind:ref={header}></Header>
<main>
    {#each windowManager.allWindows() as window}
        {#if window.open}
            <Window name={window.name} bind:minimized={window.minimized}
                bind:zIndex={window.zIndex}
                onclick={() => windowManager.windowClicked(window)}
                close={() => windowManager.closeWindow(window)}
            >
                <svelte:component this={window.component} />
            </Window>
        {/if}
    {/each}
    <GridPattern
        className="background -z-50 fixed"
        x={0}
        y={0}
        width={50}
        height={40}
        fillColor="rgb(156 163 175 / 0.3)"
    />
    <Modal />
</main>
<Footer bind:ref={footer}></Footer>