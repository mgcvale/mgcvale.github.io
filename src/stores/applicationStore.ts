import {writable, type Writable} from "svelte/store";

export type ApplicationState = {
    isTouchscreen: boolean;
}

export const applicationState: Writable<ApplicationState> = writable<ApplicationState>({
    isTouchscreen: false,
});