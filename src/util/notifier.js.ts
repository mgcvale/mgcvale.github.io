export class Notifier {
    listeners: Set<Callback>

    constructor() {
        this.listeners = new Set();
    }

    subscribe(callback: Callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback); // Return unsubscribe function
    }

    notify() {
        this.listeners.forEach(callback => callback());
    }
}

export type Callback = () => void;
