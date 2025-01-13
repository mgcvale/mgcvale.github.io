<script lang="ts">
    import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-svelte";
    const urlRegex = "(http(s)?://)?(www\\.)?([a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}|localhost)(:[0-9]{1,5})?([-a-zA-Z0-9@:%_\\+.~#?&//=]*)";
    const searchEngineFormat: string = "https://duckduckgo.com/?q=";
    let searchbarUrl: string = $state("");
    let currentUrl: string = $state("https://duckduckgo.com");
    let iframe: HTMLIFrameElement | null = $state(null);

    function processUrl(): void {
        console.log(searchbarUrl);
        if (searchbarUrl == '') return;
        if (searchbarUrl.match(urlRegex)) {
            // is a URL
            if (!searchbarUrl.startsWith("http://") && !searchbarUrl.startsWith("https://")) {
                searchbarUrl = "https://" + searchbarUrl;
            }
        } else {
            // is a search
            console.log("is a search");
            searchbarUrl = searchEngineFormat + encodeURIComponent(searchbarUrl);
            console.log(searchbarUrl);
        }
    }

    function searchBarKeydown(e: KeyboardEvent) {
        if (e.key == 'Enter') {
            processUrl();
            if (currentUrl == '') return;
            currentUrl = searchbarUrl;
        }
    }

    $effect(() => {
        searchbarUrl = currentUrl;
    })

</script>

<section class="flex flex-col justify-start h-full">
    <header class="flex justify-start flex-grow-0 p-1"><!--
        <ChevronLeft class="cursor-pointer"></ChevronLeft>
        <ChevronRight class="cursor-pointer"></ChevronRight>-->
        <RefreshCw class="p-0.5 cursor-pointer" onclick={() => { if (iframe) iframe.src = iframe.src }}></RefreshCw>
        <input
                class="flex-grow ml-1.5 px-2 pb-1 pt-0.5 bg-white dark:bg-neutral-900 outline-none border-none" style="border-radius: 4px"
                type="text" placeholder="enter URL or search on DuckDuckGo"
                bind:value={searchbarUrl} onkeydown={(e) => searchBarKeydown(e)}>
    </header>
    <iframe class="flex-grow rounded-t-lg" title="browser-content"
            sandbox="allow-scripts allow-same-origin allow-top-navigation allow-forms allow-modals allow-"
            src={currentUrl} bind:this={iframe}>
    </iframe>
</section>