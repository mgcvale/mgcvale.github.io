import { baselineEstimator, trackedWritable } from "../service/trackedWritable";

export type Pair = {
    x: number, y: number
};

export type AppMetadata = {
    fullscreenCoords: Pair,
    fullscreenSize: Pair,
};

export const appMetadata = trackedWritable<AppMetadata>('appMetadata', {
    fullscreenSize: {x: 0, y: 0},
    fullscreenCoords: {x: 0, y: 0},
}, baselineEstimator);
