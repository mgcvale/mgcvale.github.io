import {writable} from "svelte/store";

export type Pair = {
    x: number, y: number
};

export type AppMetadata = {
    fullscreenCoords: Pair,
    fullscreenSize: Pair,
};

export const appMetadata = writable<AppMetadata>({
    fullscreenSize: {x: 0, y: 0},
    fullscreenCoords: {x: 0, y: 0},
});
