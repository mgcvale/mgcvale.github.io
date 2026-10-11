import { readonly, writable, type Writable } from "svelte/store";

type MemoryEntries = Record<string, number | null>;

const entries = writable<MemoryEntries>({});
export const memoryStore = readonly(entries);

type TrackedWritable<T> = Writable<T> & { dispose(): void };

export function trackedWritable<T>(
    id: string,
    initialValue: T,
    estimateBytes: (value: T) => number
): TrackedWritable<T> {
    const store = writable(initialValue);
    let currentValue = initialValue;

    const unsubscribe = store.subscribe(value => {
        currentValue = value;
    });

    const untrack = trackSource(id, () => estimateBytes(currentValue));

    return {
        ...store,
        dispose() {
            unsubscribe();
            untrack();
        }
    };
}

const sources = new Map<string, () => number>();

export function trackSource<T>(
    id: string,
    estimator: () => number
): () => void {
    sources.set(id, estimator);

    return  () => {
        if (sources.get(id) !== estimator) return;
        sources.delete(id);

        entries.update(current => {
            const next = { ...current };
            delete next[id];
            return next;
        })
    }
}

export function totalSizeBytes(): number {
    const snapshot: MemoryEntries = {};
    let total = 0;

    for (const [id, estimator] of sources) {
        let bytes: number | null = null;

        try {
            const estimate = estimator();

            if (Number.isFinite(estimate) && estimate >= 0) {
                bytes = estimate;
                total += bytes;
            }
        } catch {}

        snapshot[id] = bytes;
    }

    entries.set(snapshot);
    return total;
}
const encoder = new TextEncoder();

export function baselineEstimator<T>(value: T): number {
    const serialized = JSON.stringify(value, (_key, entry) =>
        typeof entry === 'function' ? Function.prototype.toString.call(entry) : entry
    );
    return encoder.encode(serialized ?? '').byteLength;
}
