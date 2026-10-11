import type { Component } from "svelte";
import { baselineEstimator, trackedWritable } from "../service/trackedWritable";

export const modalStore = trackedWritable<Component | null>('modalStore', null, baselineEstimator);
