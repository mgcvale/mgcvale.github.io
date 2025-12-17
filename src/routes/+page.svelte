<script lang="ts">
    import "/src/style/main.scss";
    import { Footer, Header, Window, GridPattern } from '$lib/components';
    import { appMetadata } from '../stores/metadataStore';
    import { windowController } from "../service/windowController.svelte.js";
    import { windowManager } from "../service/windowManager.svelte.js";


    import {onMount} from "svelte";
    import Modal from "$lib/components/Modal.svelte";
    import {modalStore} from "../stores/modalStore";
    import TouchscreenWarningModal from "$lib/components/TouchscreenWarningModal.svelte";
    import { applicationState} from "../stores/applicationStore";
    import Snackbar from "$lib/components/Snackbar.svelte";
    import { snackbarStore } from "../stores/snackbarStore";
    import NotificationSnackbar from "$lib/components/NotificationSnackbar.svelte";
    import { englishWindows, windowNames } from "../util/windows";

    let header: HTMLElement | undefined = $state();
    let footer: HTMLElement | undefined = $state();
    let oldAppLang = $applicationState.language;

    onMount(() => {
        windowController.initialize(window);

        const onresize = () => {
            if (header === undefined || footer == undefined) {
                console.error("Error calculating fullscreen size");
                return;
            }

            const headerStyle = window.getComputedStyle(header);
            const headerMargin = parseInt(headerStyle.marginTop) + parseInt(headerStyle.marginBottom);

            appMetadata.update((metadata) => ({
                fullscreenCoords: {
                    x: 0,
                    y: header!.offsetHeight + headerMargin
                },
                fullscreenSize: {
                    x: window.innerWidth,
                    y: window.innerHeight - header!.offsetHeight - headerMargin
                }
            }));
        }
        window.addEventListener("resize", onresize);
        onresize();

        // check for touchscreens, and display a warning in case
        if (window.matchMedia("(pointer: coarse)").matches) {
            applicationState.update(state => ({
                ...state,
                isTouchscreen: true,
            }));
            if (localStorage.getItem("dontWarnTouchscreen") === null) {
                modalStore.set(TouchscreenWarningModal);
            }
        }

        return () => {
            window.removeEventListener("resize", onresize);
        }

    });

    applicationState.subscribe(newState => {
        if (newState.language === oldAppLang) return;
        oldAppLang = newState.language;

        if (oldAppLang === "english") {
            snackbarStore.set({
                component: NotificationSnackbar,
                props: {
                    notif: "Language set to english",
                }
            });
            setEnglish();
        } else {
            snackbarStore.set({
                component: NotificationSnackbar,
                props: {
                    notif: "Idioma mudado para português",
                }
            });
            setPortuguese();
        }
    });

    function setPortuguese() {
        windowManager.updateAllWindows(window => {
            window.name = windowNames[window.id as keyof typeof windowNames].portuguese.name;
            window.smallName = windowNames[window.id as keyof typeof windowNames].portuguese.smallName;
            return window;
        });
    }

    function setEnglish() {
        windowManager.updateAllWindows(window => {
            window.name = windowNames[window.id as keyof typeof windowNames].english.name;
            window.smallName = windowNames[window.id as keyof typeof windowNames].english.smallName;
            return window;
        });
    }

    englishWindows.forEach(w => windowManager.addWindow(w));
    if ($applicationState.language === "portuguese") {
        setPortuguese();
    }

    console.log(windowManager.getWindowlist());
    console.log(windowManager.getWindowlist().length);

</script>

<Header bind:ref={header}></Header>
<main>
    {#each windowManager.getWindowlist() as window}
        {#if window.open}
            <Window name={window.name} bind:minimized={window.minimized}
                bind:zIndex={window.zIndex}
                onclick={() => windowManager.windowClicked(window)}
                close={() => windowManager.closeWindow(window)}
            >
                <window.component/>
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
    <Snackbar />
</main>
<Footer bind:ref={footer}></Footer>