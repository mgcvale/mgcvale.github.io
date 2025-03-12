export type DockItem = {
    title: string;
    smallTitle: string
    icon: any;
    href: string;
    action: (e: MouseEvent | void) => void
}