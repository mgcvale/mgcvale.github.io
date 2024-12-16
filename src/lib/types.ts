export type DockItem = {
    title: string;
    icon: any;
    href: string;
    action: (e: MouseEvent | void) => void
}