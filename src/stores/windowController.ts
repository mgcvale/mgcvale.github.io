import type {Pair} from "./metadataStore";
import {writable, type Writable} from "svelte/store";
import {Notifier} from "../util/notifier.js";
import {Spring} from "svelte/motion";

export class WindowController {
    springStoppedNotifier: Notifier;
    focusNotifier: Notifier;
    mouseCoords: Writable<Pair> = writable<Pair>({x: 0, y: 0});
    mouseUpNotifier: Notifier;
    layerHierarchy: Writable<number[]> = writable([]);

    public constructor() {
        this.springStoppedNotifier = new Notifier();
        this.focusNotifier = new Notifier();
        this.mouseUpNotifier = new Notifier();
    }

    public initialize(window: Window): void {
        window.addEventListener('mousemove', (e: MouseEvent) => {
            this.mouseCoords.set({x: e.clientX, y: e.clientY});
        });
        window.addEventListener('mouseup', (e: MouseEvent) => {
            this.mouseUpNotifier.notify();
        })
    }
}

export const windowController: WindowController = new WindowController();