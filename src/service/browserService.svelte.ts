export default class BrowserService {
    currentUrl: string = $state("");
    searchEngineFormat: string = "https://duckduckgo.com/?q=";
    urlRegex: string = "(http(s)?:\\/\\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)";

    public processUrl(): void {
        if (this.currentUrl.match(this.urlRegex)) {
            // is a URL
            if (!this.currentUrl.startsWith("http://") && !this.currentUrl.startsWith("https://")) {
                this.currentUrl = `https://${this.currentUrl}`;
            }
        } else {
            // is a search
            this.currentUrl = `${this.searchEngineFormat}${encodeURIComponent(this.currentUrl)}`
        }
    }
}