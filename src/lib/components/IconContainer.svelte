<script module lang="ts">
    let nextHoverStoreId = 0;
</script>

<script lang="ts">
    import {
      useTransform,
      useSpring,
    } from "svelte-motion";
    import { onDestroy } from "svelte";
    import { baselineEstimator, trackedWritable } from "../../service/trackedWritable";
    import { Motion } from "svelte-motion";
    import { fade, scale } from "svelte/transition";

    let { containerX, mouseX, title, icon, href, action, dot=$bindable(false) } = $props();

    let ref: HTMLElement;
  
    let distance = useTransform(mouseX, (val: number) => {
      const bounds = ref?.getBoundingClientRect() ?? {
        x: 0,
        width: 0,
        left: 0,
      };
  
      const XDiffToContainerX = bounds?.x - containerX.get();
  
      return val - bounds?.width / 2 - XDiffToContainerX;
    });
    let widthSync = useTransform(distance, [-110, 0, 110], [40, 80, 40]);
    //   Adjust stiffness and damping as per needs
    let width = useSpring(widthSync, { stiffness: 400, damping: 25 });
  
    let hovered = trackedWritable(`IconContainer.hovered:${nextHoverStoreId++}`, false, baselineEstimator);
    let clickAnimation: Animation | undefined;
    let pressed = $state(false);
    let pressedPointer: number | undefined;
    onDestroy(() => {
      hovered.dispose();
      clickAnimation?.cancel();
    });

    function handlePointerDown(event: PointerEvent) {
      if (event.button !== 0) return;
      clickAnimation?.cancel();
      pressedPointer = event.pointerId;
      pressed = true;
    }

    function resetPress() {
      pressed = false;
      pressedPointer = undefined;
    }

    function handlePointerRelease(event: PointerEvent) {
      if (event.pointerId === pressedPointer) resetPress();
    }

    function handleClick(event: MouseEvent) {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const element = event.currentTarget as HTMLElement;
        const currentTransform = window.getComputedStyle(element).transform;
        clickAnimation?.cancel();
        clickAnimation = element.animate([
          { transform: currentTransform },
          { transform: 'translateY(8px)', offset: 0.2 },
          { transform: 'translateY(0)' },
        ], {
          duration: 400,
          easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        });
      }
      action?.(event);
    }
  
    function handleMouseEnter() {
      hovered.set(true);
    }
  
    function handleMouseLeave() {
      hovered.set(false);
    }
  </script>

  <svelte:window
    onpointerup={handlePointerRelease}
    onpointercancel={handlePointerRelease}
    onblur={resetPress}
  />
  
  <a
    {href}
    onclick={handleClick}
    onpointerdown={handlePointerDown}
    class="block transition-transform duration-150 ease-out motion-reduce:transition-none motion-reduce:translate-y-0"
    class:translate-y-2={pressed}
  >
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <Motion
      let:motion
      style={{
        width: width,
      }}
      transition={{
        bounceDamping: 300,
        bounceStiffness: 800,
        bounce: 0.3,
        duration: 0.8,
      }}
    >
      <div
        use:motion
        bind:this={ref}
        onmouseenter={handleMouseEnter}
        onmouseleave={handleMouseLeave}
        class="aspect-square rounded-full bg-gray-200 dark:bg-neutral-800 flex items-center justify-center relative group"
      >
        {#if $hovered}
          <div
            in:fade
            out:fade
            class="px-2 py-0.5 whitespace-pre rounded-md bg-gray-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
          >
            {title}
          </div>
        {/if}
        <!-- svelte-ignore svelte_component_deprecated -->
        <div class="flex items-center justify-center group-hover:scale-125 transition-all duration-200">
          <svelte:component
            this={icon}
            strokeWidth={1.4}
            class=" text-neutral-500 dark:text-neutral-300"
          />
        </div>
        {#if dot}
          <div
                  in:scale={{duration: 200, opacity: 0, delay: 700}}
                  out:scale={{duration: 250, opacity: 0}}
                  class="rounded-full absolute -bottom-1 left-1/2 bg-neutral-300 dark:bg-neutral-600" style="
            width: 8px;
            height: 8px;
            bottom: -4px;
            left: calc(50% - 4px)
          "></div>
        {/if}
      </div>
    </Motion>
  </a>

<!--
 * This file contains modified code from the repository:
 * https://github.com/SikandarJODD/svelte-animations, with modifications made by https://github.com/mgcvale.
 * 
 * Licensed under the MIT License (see LICENSE file for details).
-->
