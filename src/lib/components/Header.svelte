<script lang="ts">
    import { Github, Linkedin } from 'lucide-svelte/icons';

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

<header bind:this={ref} id="header" style="z-index: 999" class="flex sticky justify-between w-auto m-2 mx-4 dark:text-neutral-200 backdrop-blur-sm bg-neutral-400/10 border-2 border-black/5 dark:border-white/5 dark:bg-neutral-600/20 bg-opacity-30 dark:bg-opacity-30 p-1 px-2 rounded-lg">
    <span class="bricolage">mgcv</span>
    <span class="bricolage">{time}</span>
    <div class="flex gap-2 items-center">
        <a href="https://github.com/mgcvale" target="_blank"><Github /></a>
        <a href="https://www.linkedin.com/in/miguel-cyrineu-vale-7693022ba/" target="_blank"><Linkedin /></a>
    </div>
</header>
