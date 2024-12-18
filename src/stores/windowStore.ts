import { writable } from 'svelte/store';
import type { Component } from 'svelte';

export type WindowEntry = {
    component: Component,
    open: boolean,
    minimized: boolean,
    title: string,
    icon: Component,
};

export const windowStore = writable<WindowEntry[]>([]);