import type {Pair} from "./metadataStore";
import {writable, type Writable} from "svelte/store";
import {Notifier} from "../util/notifier.js";

export class WindowControllerSvelte {
    focusNotifier: Notifier;
    mouseCoords: Writable<Pair> = writable<Pair>({x: 0, y: 0});
    layerHierarchy: Writable<number[]> = writable([]);
    altDown: boolean = $state(false);

    public constructor() {
        this.focusNotifier = new Notifier();
    }

    public initialize(window: Window): void {
        window.addEventListener('mousemove', (e: MouseEvent) => {
            this.mouseCoords.set({x: e.clientX, y: e.clientY});
        });
        window.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === "alt" || e.altKey) {
                this.altDown = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (e.key.toLowerCase() === "alt" || e.altKey) {
                this.altDown = false;
            }
        });
    }
}

export const windowController: WindowControllerSvelte = new WindowControllerSvelte();