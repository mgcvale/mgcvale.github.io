import type { Component } from 'svelte';

export class WindowEntry {
    component: Component;
    open = $state(false);
    minimized = $state(true);
    icon: any;
    zIndex = $state(0);
    name: string = $state("");
    smallName: string = $state("");
    action: () => void;
    id: number;

    constructor(id: number, name: string, smallName: string, component: Component, open: boolean, minimized: boolean, icon: any) {
        this.component = component;
        this.minimized = minimized;
        this.icon = icon;
        this.open = open;
        this.name = name;
        this.smallName = smallName;
        this.id = id;

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

class WindowManager {
    windowList: WindowEntry[] = [];
    baseZIndex: number = 10;

    public addWindow(windowEntry: WindowEntry): void {
        this.windowList.push(windowEntry);
        windowEntry.zIndex = this.windowList.length;
    }

    public windowActionPerformed(window: WindowEntry): void {
        if (window.open) {
            this.minimizeWindow(window);
        } else {
            this.openWindow(window);
        }
    }

    public openWindow(window: WindowEntry): void {
        window.open = true;
        setTimeout(() => {
            window.minimized = false;
        }, 150)
        this.windowClicked(window); // simulate window click to throw it to the top
    }

    public closeWindow(window: WindowEntry): void {
        window.minimized = true;
        setTimeout(() => {
            window.open = false;

            this.windowList.forEach((w: WindowEntry) => {
                if (w.zIndex > window.zIndex) {
                    w.zIndex--;
                }
            });
        }, 700);
    }

    public minimizeWindow(window: WindowEntry): void {
        window.minimized = !window.minimized;
        if (!window.minimized) {
            this.windowClicked(window); // simulate window click to throw it to the top
        }
    }

    public getWindowlist(): WindowEntry[] {
        return this.windowList;
    }

    public updateAllWindows(updater: (window: WindowEntry) => WindowEntry) {
        for (let i = 0; i < this.windowList.length; i++) {
            this.windowList[i] = updater(this.windowList[i]);
        }
    }

    public windowClicked(window: WindowEntry): void {
        // here, we gotta do the following:
        // Firstly, we set the z index of the current window as the base z index + the window quantity.
        // After that, we MAY need to make every other window (that was above the clicked one) have their Z index lowered.
        // That will only happen if the clicked window wasn't the current top window, so we check for that.

        const windowZIndex = window.zIndex;
        const topZIndex = this.baseZIndex + this.windowList.length;

        // if the topZIndex and the windowZIndex are equal, the clicked window was already the top one.
        if (windowZIndex === topZIndex) {
            return; // in this case we don't need to do anything
        }

        // else, this window will become the top one.
        window.zIndex = topZIndex;

        // and all the ones will be 1 zIndex lower (apart from the ones which were already lower thant the window to begin with
        this.windowList.forEach(w => {
            if (w.zIndex > windowZIndex) { // we only change the zIndex if it was above the window
                w.zIndex--;
            }
        });
    }

}

export let windowManager: WindowManager = new WindowManager();