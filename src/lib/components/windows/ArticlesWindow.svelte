<script lang="ts">
    import { type Component } from 'svelte';
    import { BlogEntry } from "../../../service/BlogManager";
    import FindingACHTTPFramework from "$lib/components/articles/FindingACHTTPFramework.svelte";
    import JavaFXDevelopmentIn2025 from "$lib/components/articles/JavaFXDevelopmentIn2025.svelte";
    import {expoInOut, expoOut} from "svelte/easing";
    import {ChevronLeft} from "lucide-svelte";
    import { fly, fade } from 'svelte/transition';

    let isBlogOpen: boolean = $state(false);
    let isListOpen: boolean = $state(true);

    let currentBlog: null | Component = $state(null);

    const blogs: BlogEntry[] = [
        new BlogEntry("Finding a C HTTP Framework for Opensync", "Opensync's Framework", 2025, 3, "The struggle to find a C HTTP framework that fit opensync well", FindingACHTTPFramework),
        new BlogEntry("Breaking down JurAI's Desktop app", "JurAI Desktop", 2025, 3, "How it was to develop JurAI's JavaFX Desktop app, and a discussion about the current state of Desktop development in 2025", JavaFXDevelopmentIn2025)
    ];
    let currentBlogs: BlogEntry[] = $state(blogs);

    let searchQuery: string = $state("");

    const PROJECT_LIST_TRANSITION_DURATION = 800;
    const PROJECT_LIST_TRANSITION_DELAY = 100;
    const PROJECT_LIST_TRANSITION_DELAY_ANTICIPATION = 30;
    const PROJECT_TRANSITION_DURATION = 1000;
    const TRANSITION_UPDATE_ANTICIPATION = 200;
</script>

<article>
    {#if isListOpen}
        {#if currentBlogs.length != 0}
            <h1 out:fade={{duration: PROJECT_LIST_TRANSITION_DURATION, easing: expoInOut}}
                in:fade={{duration: PROJECT_LIST_TRANSITION_DURATION, easing: expoInOut, delay: 200}}
            >
                Articles
            </h1>
        {/if}
        <div class="min-h-full my-20 flex flex-col justify-center align-middle px-4 project-list">
            {#each currentBlogs as blog, index}
                <button onclick={() => {
                        setTimeout(() => {
                            isListOpen = false;
                            isBlogOpen = true;
                        }, blogs.length * (PROJECT_LIST_TRANSITION_DELAY - PROJECT_LIST_TRANSITION_DELAY_ANTICIPATION) + PROJECT_LIST_TRANSITION_DURATION - TRANSITION_UPDATE_ANTICIPATION);
                        currentBlog = blog.blog;
                        currentBlogs = [];
                    }}
                        out:fly={{ y: 50, duration: PROJECT_LIST_TRANSITION_DURATION, delay: (blogs.length - index - 1) * PROJECT_LIST_TRANSITION_DELAY, easing: expoInOut}}
                        in:fly={{y: 50, duration: PROJECT_LIST_TRANSITION_DURATION, delay: index * PROJECT_LIST_TRANSITION_DELAY, easing: expoInOut}}
                >
                    <div>
                        <span class="title">{blog.name}</span>
                        <span class="small-title">{blog.smallname}</span>
                        <div class="line-separator"></div>
                        <div class="manrope block">{blog.month}/{blog.year}</div>
                    </div>
                    <span class="description text-left mx-4 mb-2">{blog.description}</span>
                </button>
            {/each}
        </div>
    {/if}
    {#if isBlogOpen}
        <div>
            <button onclick={() => {
                isBlogOpen = false;
                setTimeout(() => {
                    isListOpen = true;
                    setTimeout(() => {
                        currentBlogs = blogs;
                    }, 10);
                }, PROJECT_TRANSITION_DURATION - TRANSITION_UPDATE_ANTICIPATION);
            }}
                    out:fly={{y: 50, duration: PROJECT_TRANSITION_DURATION, easing: expoInOut}}
                    in:fly={{y: 60, duration: PROJECT_TRANSITION_DURATION * 1.4, easing: expoOut}}
                    class="mb-2 pr-4 pl-2 py-1 bg-neutral-300 bg-opacity-40 dark:bg-neutral-700 dark:bg-opacity-35 rounded-xl flex gap-1 hover:bg-opacity-90 dark:hover:bg-opacity-95"
            >
                <ChevronLeft></ChevronLeft> Back to blog list
            </button>
            <div out:fly={{y: 50, duration: PROJECT_TRANSITION_DURATION, delay: 100, easing: expoInOut}} in:fly={{y: 60, duration: PROJECT_TRANSITION_DURATION * 1.4, delay: 200, easing: expoOut}}>
                <svelte:component this={currentBlog} />
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
      @apply flex flex-col rounded-xl cursor-pointer bg-neutral-500 bg-opacity-0 hover:bg-opacity-15;


      > div {
        container-type: inline-size;
        @apply flex items-center justify-between gap-1 align-middle text-center mr-2;

        padding: clamp(6px, 8%, .8rem) clamp(8px, 1rem, 1.5rem) !important;

        .title, .small-title {
          @apply manrope-bold text-lg;
        }

        .small-title {
          display: none;
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
          @apply flex-grow mx-4;
          max-height: 1px;
          height: 1px !important;
          display: block;
          position: relative;

          &::before {
            position: absolute;
            top: 50%;
            width: 100%;
            left: 0;
            content: '';
            height: 1px;
            background-color: theme('colors.neutral.400');
          }
        }

        @container (max-width: 420px) {
          .description {
            display: none;
          }
          .title {
            display: none;
          }
          .small-title {
            display: block;
          }
        }

        @container (max-width: 320px) {
          .line-separator {
            display: none;
          }
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
