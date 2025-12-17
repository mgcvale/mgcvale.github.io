export type DockItem = {
    id?: number;
    title: string;
    smallTitle: string;
    icon: any;
    href: string;
    action: (e: MouseEvent | void) => void;
}