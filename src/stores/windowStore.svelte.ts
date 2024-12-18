import { writable } from 'svelte/store';
import type { Component } from 'svelte';

export class WindowEntry {
    component: Component;
    open = $state(false);
    minimized =$state(true);
    icon: any;
    action: () => void;

    constructor(component: Component, open: boolean, minimized: boolean, icon: any) {
        this.component = component;
        this.minimized = minimized;
        this.icon = icon;
        this.open = open;

        this.action = () => {
            if (!this.open) {
                this.open = true;
                setTimeout(() => {
                    this.minimized = false;
                }, 150);
            } else {
                this.minimized = !this.minimized;
            }
        }
     }
};

export const windowStore = writable<Map<string, WindowEntry>>(new Map());