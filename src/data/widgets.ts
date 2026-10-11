import PerformanceWidget from "$lib/components/widget/PerformanceWidget.svelte";
import { WidgetEntry } from "../service/widgetManager.svelte";

export const widgetNames = {
    performance: {
        english: "Performance",
        portuguese: "Desempenho",
    },
};

export const englishWidgets: WidgetEntry[] = [
    new WidgetEntry(
        "performance",
        widgetNames.performance.english,
        PerformanceWidget,
        true,
        {
            x: 24,
            y: 24,
            anchor: "bottom-right"
        }
    ),
];
