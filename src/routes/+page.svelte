<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";
    import Header from "$lib/components/Header.svelte";
    import "/src/style/main.scss";
    import { appMetadata } from '../stores/metadataStore';
    import {onMount} from "svelte";
    import Window from "$lib/components/Window.svelte";
    import {windowController} from "../controller/windowController.svelte.js";
    import AboutWindow from "$lib/components/windows/AboutWindow.svelte";
    import GridPattern from "$lib/components/GridPattern.svelte";
    import {cn} from "$lib/util";
    import SidWindow from "$lib/components/windows/SidWindow.svelte";
    import { WindowEntry, windowStore} from "../stores/windowStore.svelte";
    import { Info } from "lucide-svelte";
    import { TriangleAlert } from "lucide-svelte";
    import { scale } from 'svelte/transition'
    import {elasticOut} from "svelte/easing";
    import {cubicBezier} from "popmotion";

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

        return () => {
            window.removeEventListener("resize", onresize);
        }
    });

    const windows: Map<string, WindowEntry> = new Map();
    windows.set('About', new WindowEntry(
        AboutWindow,
        false,
        true,
        Info
    ));
    windows.set('WARNING', new WindowEntry(
        AboutWindow,
        false,
        true,
        TriangleAlert
    ));
    windowStore.set(windows);

</script>

<Header bind:ref={header}></Header>
<main>
    {#each [...$windowStore] as [key, value]}
        {#if value.open}
            <Window name={key} bind:minimized={value.minimized} close={() => {
                value.minimized = true;
                setTimeout(() => {
                    value.open = false;
                }, 700);
            }}>
                <svelte:component this={value.component} />
            </Window>
        {/if}
    {/each}
    <GridPattern
            squares={[
      [4, 4],
      [5, 1],
      [8, 2],
      [6, 6],
      [10, 5],
      [13, 3],
      [14, 4],
    ]}
    className={cn(
        "background",
        "-z-10",
        "fixed"
    )}
    x={0}
    y={0}
    width={50}
    height={40}
    fillColor="rgb(156 163 175 / 0.3)"
    />
</main>
<Footer bind:ref={footer}></Footer>