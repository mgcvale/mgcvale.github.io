<script lang="ts">
    import { Github } from 'lucide-svelte';

    let time: string = $state("");

    setInterval(() => {
        var currentDate = new Date();
        time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
    }, 1000)

</script>

<header class="flex justify-between w-auto m-2 mx-4 dark:text-neutral-200 backdrop-blur-sm bg-neutral-300 dark:bg-neutral-700 bg-opacity-50 p-1 px-2 rounded-lg">
    <span class="orbitron">mgcv</span>
    <span class="orbitron">{time}</span>
    <a href="https://github.com/mgcvale" target="_blankit "><Github /></a>
</header>