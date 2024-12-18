<script lang="ts">
    import { Github } from 'lucide-svelte';

    let time: string = $state("");
    let { ref = $bindable() } = $props();

    setInterval(() => {
        const currentDate = new Date();
        let hours: number | string = currentDate.getHours();
        hours = hours < 10  ? `0${hours}` : hours;
        let minutes: number | string = currentDate.getMinutes();
        minutes = minutes < 10 ? `0${minutes}` : minutes;
        let seconds: number | string = currentDate.getSeconds();
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        time = `${hours}:${minutes}:${seconds}`;
    }, 1000)

</script>

<header bind:this={ref} id="header" style="z-index: 999" class="flex sticky justify-between w-auto m-2 mx-4 dark:text-neutral-200 backdrop-blur-sm bg-neutral-400 dark:bg-neutral-600 bg-opacity-30 dark:bg-opacity-30 p-1 px-2 rounded-lg">
    <span class="orbitron">mgcv</span>
    <span class="orbitron">{time}</span>
    <a href="https://github.com/mgcvale" target="_blankit "><Github /></a>
</header>