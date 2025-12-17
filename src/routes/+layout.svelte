<script>
    import "../app.css";

    export const ssr = false;
    export const preload = false;

    let { children } = $props();
</script>

{@render children()}

