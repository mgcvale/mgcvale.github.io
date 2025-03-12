<script lang="ts">
    import { ProjectEntry } from "../../../service/projectManager.svelte";
    import CotilMapsProject from "../projects/CotilMapsProject.svelte";
    import JurAIProject from "../projects/JurAIProject.svelte";
    import OpensyncProject from "../projects/OpensyncProject.svelte";
    import PortifolioProject from "../projects/PortifolioProject.svelte";
    import YamiProject from "../projects/YamiProject.svelte";
    import type { Component } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import { expoInOut, expoIn, expoOut } from 'svelte/easing';
    import { ChevronLeft } from "lucide-svelte";
    import SculptProject from "$lib/components/projects/SculptProject.svelte";

    let isProjectOpen: boolean = $state(false);
    let isListOpen: boolean = $state(true);
    let currentProject: null | Component = $state(null);

    const projects = [
        new ProjectEntry("JurAI", "AI-Powered jurisprudence helper", "2023-2025", JurAIProject),
        new ProjectEntry("Opensync", "Self-hosted cloud solutions", "2024-2025", OpensyncProject),
        new ProjectEntry("Sculpt", "HTTP Framework written in C", "2024-2025", SculptProject),
        new ProjectEntry("Yami", "Social media for food critics", "2025", YamiProject),
        new ProjectEntry("Portifolio", "This portifolio you're seeing", "2024", PortifolioProject),
        new ProjectEntry("CotilMaps", "Internal college mapping", "2023", CotilMapsProject),
    ];
    let currentProjects: ProjectEntry[] = $state(projects);

    // When making a showing/hiding animation, you need to wait for the animation to complete before hdiing the component.
    // This is why I'm using setTimeouts() on the code below. However, we almost never need to wait the full time of the animation - we can anticipate it some
    // This is what the *_ANTICIPATION variables are for - they set how much the program will anticipate the showing/hiding of the animated components.
    const PROJECT_LIST_TRANSITION_DURATION = 800;
    const PROJECT_LIST_TRANSITION_DELAY = 100;
    const PROJECT_LIST_TRANSITION_DELAY_ANTICIPATION = 30;
    const PROJECT_TRANSITION_DURATION = 1000;
    const TRANSITION_UPDATE_ANTICIPATION = 200;

</script>

<article>
   {#if isListOpen}
        {#if currentProjects.length != 0}
        <h1 out:fade={{duration: PROJECT_LIST_TRANSITION_DURATION, easing: expoInOut}}
            in:fade={{duration: PROJECT_LIST_TRANSITION_DURATION, easing: expoInOut, delay: 200}}
        >
            Projects
        </h1>
        {/if}
        <div class="min-h-full my-20 flex flex-col justify-center align-middle px-4 project-list">
            {#each currentProjects as project, index}
                <button onclick={() => {
                        setTimeout(() => {
                            isListOpen = false;
                            isProjectOpen = true;
                        }, projects.length * (PROJECT_LIST_TRANSITION_DELAY - PROJECT_LIST_TRANSITION_DELAY_ANTICIPATION) + PROJECT_LIST_TRANSITION_DURATION - TRANSITION_UPDATE_ANTICIPATION);
                        currentProject = project.content;
                        currentProjects = [];
                    }}
                    out:fly={{ y: 50, duration: PROJECT_LIST_TRANSITION_DURATION, delay: (projects.length - index - 1) * PROJECT_LIST_TRANSITION_DELAY, easing: expoInOut}}
                    in:fly={{y: 50, duration: PROJECT_LIST_TRANSITION_DURATION, delay: index * PROJECT_LIST_TRANSITION_DELAY, easing: expoInOut}}
                >
                    <span class="title">{project.name}</span>
                    <span class="description">{project.description}</span>
                    <div class="line-separator"></div>
                    <div class="manrope">{project.years}</div>
                </button>
            {/each}
        </div>
    {/if}
    {#if isProjectOpen}
        <div>
            <button onclick={() => {
                isProjectOpen = false;
                setTimeout(() => {
                    isListOpen = true;
                    setTimeout(() => {
                        currentProjects = projects;
                    }, 10);
                }, PROJECT_TRANSITION_DURATION - TRANSITION_UPDATE_ANTICIPATION);
            }}
            out:fly={{y: 50, duration: PROJECT_TRANSITION_DURATION, easing: expoInOut}}
            in:fly={{y: 60, duration: PROJECT_TRANSITION_DURATION * 1.4, easing: expoOut}}
            class="mb-2 pr-4 pl-2 py-1 bg-neutral-300 bg-opacity-40 dark:bg-neutral-700 dark:bg-opacity-35 rounded-xl flex gap-1 hover:bg-opacity-90 dark:hover:bg-opacity-95"
            >
                <ChevronLeft></ChevronLeft> Back to project list
            </button>
            <div out:fly={{y: 50, duration: PROJECT_TRANSITION_DURATION, delay: 100, easing: expoInOut}} in:fly={{y: 60, duration: PROJECT_TRANSITION_DURATION * 1.4, delay: 200, easing: expoOut}}>
                <svelte:component this={currentProject} />
            </div>
        </div>
    {/if}
</article>

<style lang="scss">

    @use '/src/style/util';

    .project-list {
        padding-left: clamp(0px, 5%, 1rem);
        padding-right: clamp(0px, 5%, 1rem);
        @apply min-h-full my-20 flex flex-col justify-center align-middle;

        button {
            container-type: inline-size;
            @apply flex items-center justify-around gap-1 align-middle text-center rounded-xl cursor-pointer bg-neutral-500 bg-opacity-0 hover:bg-opacity-15;
        

            padding: clamp(6px, 8%, .8rem) clamp(8px, 1rem, 1.5rem) !important;

            .title {
                @apply manrope-bold text-lg;
            }

            .description {
                @apply text-neutral-500 dark:text-neutral-400 manrope-semibold;

                &::before {
                    content: '~';
                    font-size: small;
                    padding-right: 4px;
                }
            }

            .line-separator {
                @apply border-t border-neutral-400 flex-grow mx-4 my-0;
            }

            // ik this class is a utility for a font but why not use it for other things
            .manrope {
                @apply my-0 p-0;
            }

            @container (max-width: 420px) {
                .description {
                    display: none;
                }
            }
        }

        button:not(:last-child) {
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 4%;
                width: 92%;
                height: 1px;
                @apply bg-neutral-400 dark:bg-neutral-600 bg-opacity-10;
            }
        }
    }
</style>