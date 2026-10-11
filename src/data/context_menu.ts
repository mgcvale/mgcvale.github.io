import type { ContextMenuEntry } from "$lib/components";
import { performanceWidget } from "./widgets";

export const contextMenuEntries: ContextMenuEntry[] = [
    {
        englishName: "Widgets",
        portugueseName: "Widgets",
        onAction: () => null,
        subItems: [
            {
                englishName: "Performance",
                portugueseName: "Performance",
                onAction: () => performanceWidget.open = true
            }
        ]
    }
]