import PerformanceWidget from "$lib/components/widget/PerformanceWidget.svelte";
import { WidgetEntry } from "../service/widgetManager.svelte";

export const englishWidgets: WidgetEntry[] = [
    new WidgetEntry(
        "performance",
        "Performance",
        PerformanceWidget,
        true,
        {
            x: 24,
            y: 24,
            anchor: "bottom-right"
        }
    ),
];