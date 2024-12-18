<script lang="ts">
    import { cn } from '$lib/util';

    let { className, translateX = 0, translateY = 0, translateZ = 0, rotateX = 0, rotateY = 0, rotateZ = 0, isMouseEntered = false, children, ...rest } = $props();
    let ref: HTMLDivElement;

    $effect(() => {
        if (!ref) return;
        if (isMouseEntered) {
            ref.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        } else {
            ref.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
        }
    });
</script>

<div
        bind:this={ref}
        class={cn('w-fit transition duration-200 ease-linear', className)}
        {...rest}
>
    {@render children()}
</div>