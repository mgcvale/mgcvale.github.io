<script lang="ts">
    import { onMount } from "svelte";
    import { totalSizeBytes } from "../../../service/trackedWritable";
    import { windowManager } from "../../../service/windowManager.svelte";
    import { applicationState } from "../../../stores/applicationStore";

    const updateInterval = 300; // ms
    const smoothingTime = 800; // ms; larger values soften spikes but respond more slowly

    let memory = $state(0);
    let openWindows = $state(0);
    let mainThreadDelay = $state(0);

    let labels = $derived($applicationState.language === 'english' ? {
        locale: 'en-US',
        metrics: 'Performance metrics',
        memoryUsage: 'Memory usage',
        openWindows: 'Open windows',
        loopLag: 'Loop Lag',
        loopLagDescription: 'Smoothed timer lateness as a share of elapsed time, where higher values mean reduced responsiveness.',
    } : {
        locale: 'pt-BR',
        metrics: 'Métricas de desempenho',
        memoryUsage: 'Uso de memória',
        openWindows: 'Janelas abertas',
        loopLag: 'Atraso',
        loopLagDescription: 'Atraso suavizado do temporizador como porcentagem do tempo decorrido. Valores maiores indicam uma interface menos responsiva.',
    });
    let memoryFormat = $derived(new Intl.NumberFormat(labels.locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }));
    let countFormat = $derived(new Intl.NumberFormat(labels.locale));
    let delayFormat = $derived(new Intl.NumberFormat(labels.locale, {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }));

    function updateMeasurements() {
        memory = totalSizeBytes() / 1024;
        openWindows = windowManager.windowList.reduce(
            (total, window) => total + (window.open ? 1 : 0),
            0
        );
    }

    onMount(() => {
        let timer: number | undefined;
        let sampleStartedAt = 0;

        function scheduleSample() {
            sampleStartedAt = performance.now();
            timer = window.setTimeout(sample, updateInterval);
        }

        function sample() {
            const elapsed = performance.now() - sampleStartedAt;
            const lateness = Math.max(0, elapsed - updateInterval);
            const delayPercent = elapsed > 0 ? (lateness / elapsed) * 100 : 0;
            const alpha = 1 - Math.exp(-elapsed / smoothingTime);
            mainThreadDelay += alpha * (delayPercent - mainThreadDelay);

            updateMeasurements();
            scheduleSample();
        }

        function handleVisibilityChange() {
            window.clearTimeout(timer);
            if (document.hidden) return;

            mainThreadDelay = 0;
            updateMeasurements();
            scheduleSample();
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);
        handleVisibilityChange();

        return () => {
            window.clearTimeout(timer);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    });
</script>

<table class="w-full border-separate border-spacing-x-0 border-spacing-y-1 px-1.5" aria-label={labels.metrics}>
    <tbody>
        <tr>
            <th scope="row" class="whitespace-nowrap text-left font-normal">{labels.memoryUsage}</th>
            <td aria-hidden="true" class="px-3"></td>
            <td class="min-w-[9ch] whitespace-nowrap text-right tabular-nums">{memoryFormat.format(memory)} KiB</td>
        </tr>
        <tr>
            <th scope="row" class="whitespace-nowrap text-left font-normal">{labels.openWindows}</th>
            <td aria-hidden="true" class="px-3"></td>
            <td class="min-w-[9ch] whitespace-nowrap text-right tabular-nums">{countFormat.format(openWindows)}</td>
        </tr>
        <tr>
            <th
                scope="row"
                class="whitespace-nowrap text-left font-normal"
                title={labels.loopLagDescription}
            >{labels.loopLag}</th>
            <td aria-hidden="true" class="px-3"></td>
            <td class="min-w-[9ch] whitespace-nowrap text-right tabular-nums">{delayFormat.format(mainThreadDelay / 100)}</td>
        </tr>
    </tbody>
</table>
