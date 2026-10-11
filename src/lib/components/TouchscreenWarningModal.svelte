<script lang="ts">
    import { modalStore } from "../../stores/modalStore";
    import { TriangleAlert } from "lucide-svelte";

    let dontWarn: boolean = false;
</script>

<div class="p-3 text-neutral-700 dark:text-neutral-200">
    <div class="flex items-center gap-2.5 py-1 text-neutral-800 dark:text-neutral-100">
        <TriangleAlert size={20} class="shrink-0" aria-hidden="true" />
        <h1 class="bricolage text-xl font-semibold leading-tight">WARNING</h1>
    </div>
    <div class="mt-3 space-y-2">
        <p class="text-base font-medium leading-6 text-neutral-900 dark:text-neutral-100">
            You seem to be using a device with a touchscreen.
        </p>
        <p class="text-sm leading-6">
            The website will work, but it is recommended to use a keyboard and mouse for the best experience.
        </p>
    </div>
    <div class="mt-5 flex flex-wrap items-center justify-between gap-3">
        <label for="warn-cbx" class="inline-flex cursor-pointer items-center gap-2 text-sm">
            <input
                type="checkbox"
                name="warn-cbx"
                id="warn-cbx"
                class="h-3.5 w-3.5 shrink-0 accent-neutral-700 dark:accent-neutral-200"
                bind:checked={dontWarn}
            />
            <span>Don't warn me again</span>
        </label>
        <button
            type="button"
            class="ml-auto rounded-md border-2 border-black/5 bg-gray-300/10 px-4 py-1.5 text-sm font-medium text-neutral-800 hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 dark:border-white/10 dark:bg-gray-600/10 dark:text-neutral-100 dark:hover:bg-white/10"
            onclick={() => {
                $modalStore = null;
                if (dontWarn) {
                    localStorage.setItem('dontWarnTouchscreen', '');
                }
            }}
        >Okay!</button>
    </div>
</div>
