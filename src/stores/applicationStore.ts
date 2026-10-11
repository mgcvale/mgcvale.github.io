import { baselineEstimator, trackedWritable } from "../service/trackedWritable";

export type ApplicationState = {
    isTouchscreen: boolean,
    language: string,
};

export const applicationState = trackedWritable<ApplicationState>('applicationState', {
    isTouchscreen: false,
    language: "english",
}, baselineEstimator);
