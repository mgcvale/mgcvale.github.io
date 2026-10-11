import type { Component } from "svelte";

export type WidgetPosition = {
    x: number;
    y: number;
    w?: number;
    h?: number;
    anchor: 'top-left' | 'bottom-right';
}

export class WidgetEntry {
    component: Component;
    open: boolean = $state(false);
    id: string;
    name: string = $state("");
    position: WidgetPosition;

    constructor(id: string, name: string, component: Component, open: boolean, position: WidgetPosition) {
        this.component = component;
        this.id = id;
        this.open = open;
        this.name = name;
        this.position = position;
    }
}

class WidgetManager {
    widgetList: WidgetEntry[] = [];

    public addWidget(widget: WidgetEntry) {
        this.widgetList.push(widget);
    }

    public openWidget(widget: WidgetEntry) {
        widget.open = true;
    }

    public closeWidget(widget: WidgetEntry) {
        widget.open = false;
    }

    public getWidgetList(): WidgetEntry[] {
        return this.widgetList;
    }
}

export const widgetManager = new WidgetManager();