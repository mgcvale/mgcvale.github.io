<script lang="ts">
    import Footer from "$lib/components/Footer.svelte";
    import Header from "$lib/components/Header.svelte";
    import "/src/style/main.scss";
    import { appMetadata } from '../stores/metadataStore';
    import {onMount} from "svelte";
    import Window from "$lib/components/Window.svelte";
    import {windowController} from "../stores/windowController.svelte";

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
    {#snippet content()}
        <div>
            <h2 class="m-auto">Testando</h2>
        </div>
    {/snippet}
    <Window name={"test window"} content={content}></Window>
</main>
<Footer bind:ref={footer}></Footer>