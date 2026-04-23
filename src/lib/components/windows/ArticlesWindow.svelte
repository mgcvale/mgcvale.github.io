<script lang="ts">
    import { applicationState } from "../../../stores/applicationStore";
</script>

<article class="flex flex-col items-center justify-center h-full py-20 gap-2">
    <p class="text-4xl">🚧</p>
    {#if $applicationState.language === "english"}
        <h2 class="text-xl manrope-bold">Work in progress</h2>
        <p class="dark:text-neutral-400 text-neutral-500 manrope">Articles are coming soon. Check back later!</p>
    {:else}
        <h2 class="text-xl manrope-bold">Em desenvolvimento</h2>
        <p class="dark:text-neutral-400 text-neutral-500 manrope">Os artigos estão chegando em breve. Volte mais tarde!</p>
    {/if}
</article>

<style lang="scss">
</style>
