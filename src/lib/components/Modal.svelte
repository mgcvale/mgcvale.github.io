<script lang="ts">
    import { modalStore } from "../../stores/modalStore";
    import { scale, fade } from 'svelte/transition';

    let showing = $state();

    modalStore.subscribe((newModal) => {
        showing = newModal !== null;
    });

</script>

<!-- svelte-ignore svelte_component_deprecated -->
{#if showing}
    <div transition:fade={{duration: 300}} class="fixed top-0 left-0 modal-container w-screen h-screen bg-white/25 dark:bg-black backdrop-blur-sm flex justify-center">
        <div transition:scale={{duration: 300, opacity: 0}} class="modal m-auto max-h-fit backdrop-blur-sm bg-gray-300/10 dark:bg-gray-600/10 border-2 border-black/5 dark:border-white/10 rounded-lg p-2">
            <svelte:component this={$modalStore} />
        </div>
    </div>
{/if}

<style lang="scss">
    .modal-container {
        z-index: 99999;

        .modal {
            max-width: calc(100% - 2rem);
            width: 440px;
        }
    }
</style>
