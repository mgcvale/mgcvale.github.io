<script lang="ts">
    import { modalStore } from "../../stores/modalStore";
    import { scale, fade } from 'svelte/transition';

    let showing = $state();

    modalStore.subscribe((newModal) => {
        showing = newModal !== null;
    });

</script>

{#if showing}
    <div transition:fade={{duration: 300}} class="fixed top-0 left-0 modal-container w-screen h-screen bg-black bg-opacity-25 backdrop-blur-sm flex justify-center">
        <div transition:scale={{duration: 300, opacity: 0}} class="modal m-auto max-h-fit bg-neutral-300 dark:bg-neutral-700 border-2 border-neutral-100 dark:border-neutral-800 rounded-lg p-2">
            <svelte:component this={$modalStore} />
        </div>
    </div>
{/if}

<style lang="scss">
    .modal-container {
        z-index: 99999;

        .modal {
            max-width: 80%;
            width: 440px;
        }
    }
</style>