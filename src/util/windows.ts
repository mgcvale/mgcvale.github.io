import { AboutWindow, ProjectsWindow } from "$lib/components/windows";
import { GlobeIcon, Info, Lightbulb, NotebookPen } from "lucide-svelte";
import { WindowEntry } from "../service/windowManager.svelte";
import BrowserWindow from "$lib/components/windows/BrowserWindow.svelte";
import BlogsWindow from "$lib/components/windows/ArticlesWindow.svelte";

export const windowNames = {
    0:  {
        english: {
            name: "About",
            smallName: "About",    
        },
        portuguese: {
            name: "Sobre",
            smallName: "Sobre",
        }
    },
    1: {
        english: {
            name: "Projects",
            smallName: "Projects",
        },
        portuguese: {
            name: "Projetos",
            smallName: "Projetos"
        }
    },
    2: {
        english: {
            name: "Web Browser",
            smallName: "Browser"
        },
        portuguese: {
            name: "Navegador Web",
            smallName: "Navegador"
        }
    },
    3: {
        english: {
            name: "Articles",
            smallName: "Articles"
        },
        portuguese: {
            name: "Artigos",
            smallName: "Artigos"
        }
    }
}

export const englishWindows: WindowEntry[] = [
    new WindowEntry(
        0,
        "About",
        "About",
        AboutWindow,
        false,
        true,
        Info
    ),
    new WindowEntry(
        1,
        "Projects",
        "Projects",
        ProjectsWindow,
        false,
        true,
        Lightbulb
    ),
    new WindowEntry(
        2,
        "Web Browser",
        "Browser",
        BrowserWindow,
        false,
        true,
        GlobeIcon
    ),
    new WindowEntry(
        3,
        "Articles",
        "Articles",
        BlogsWindow,
        false,
        true,
        NotebookPen
    ),
];
