<script lang="ts">
    import { modalStore } from "../../stores/modalStore";
    import { TriangleAlert} from "lucide-svelte";

    let dontWarn: boolean = false;
</script>

<div class="modal-content px-0">
    <h1 class="flex items-center">
        <TriangleAlert></TriangleAlert>
        WARNING
    </h1>
    <h3>You seem to be using a device with a touchscreen.</h3>
    <p>While the website will work, it is reccomended to use a keyboard and mouse for the best experience.</p>
    <div class="flex justify-between align-center pt-3 pb-1">
        <div>
            <input type="checkbox" name="warn-cbx" id="warn-cbx" bind:checked={dontWarn}>
            <label for="warn-cbx">Don't warn me again</label>
        </div>
        <button class="bg-neutral-200 border-neutral-100 border-2 px-4 rounded-md" onclick={() => {
            $modalStore = null;
            if (dontWarn) {
                console.log("Not warning about touchscreen again!");
                localStorage.setItem('dontWarnTouchscreen', '');
            }
        }}>Okay!</button>
    </div>
</div>