import type {Pair} from "../stores/metadataStore";
import {writable, type Writable} from "svelte/store";
import {Notifier} from "../util/notifier.js.js";

export class WindowControllerSvelte {
    mouseCoords: Writable<Pair> = writable<Pair>({x: 0, y: 0});
    altDown: boolean = $state(false);

    public constructor() {
    }

    public initialize(window: Window): void {
        window.addEventListener('mousemove', (e: MouseEvent) => {
            this.mouseCoords.set({x: e.clientX, y: e.clientY});
        });
        window.addEventListener('touchmove', (e: TouchEvent) => {
            const touch = e.touches[0];
            this.mouseCoords.set({ x: touch.clientX, y: touch.clientY });
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