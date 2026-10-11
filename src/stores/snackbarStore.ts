import type { Component } from "svelte";
import { baselineEstimator, trackedWritable } from "../service/trackedWritable";

export interface SnackbarConfig {
    component: Component;
    props?: Record<string, any>;
}

export const snackbarStore = trackedWritable<SnackbarConfig | null>('snackbarStore', null, baselineEstimator);
