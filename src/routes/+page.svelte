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
</script>

<Header bind:ref={header}></Header>
<main>
    <Window name={"about"}>
        <AboutWindow />
    </Window>
    <Window name="WARNING">
        <SidWindow/>
    </Window>
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