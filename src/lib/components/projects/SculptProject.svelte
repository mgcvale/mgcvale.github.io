<script lang="ts">
    import hljs from "highlight.js";
    import c from 'highlight.js/lib/languages/c';
    import { onMount } from "svelte";
    
    hljs.registerLanguage('c', c);
    
    const code1 = `
#include <stdio.h>
#include <sys/signal.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include "src/sculpt.h"

void root_handler_http(int fd, sc_http_msg msg, sc_headers *headers, void *extra_data) {
    char body[] = "<html><h1>Hello, world!</h1></html>\\0";

    sc_headers *response_headers = NULL;
    response_headers = sc_header_append("Server: Sculpt/0.1", response_headers);

    if (sc_easy_send(fd, 200, "OK", "Content-Type: text/html", body, response_headers) == SC_OK) {
        printf("Response sent\\n");
    } else {
        perror("Error sending response");
    }
}

int main() {
    // create and setup socket
    sc_addr_info addr_info = sc_addr_create(AF_INET, 8000, INADDR_ANY);
    sc_conn_mgr *mgr = sc_mgr_create(addr_info, NULL);

    sc_mgr_epoll_init(mgr);
    sc_mgr_conn_pool_init(mgr, 3);
    sc_mgr_listen(mgr);
    sc_mgr_bind_soft(mgr, "/", root_handler_http);

    for(;;) {
        sc_mgr_poll(mgr, 1000);
    }

    return 0;
}`;

    const code2 = `void root_handler_http_socket(int fd, sc_http_msg msg, sc_headers *headers, void *extra_data) {
    const char *body = "<html><h1>Hello, world!</h1></html>";
    size_t body_len = strlen(body);

    char response[512];
    int len = snprintf(response, sizeof(response),
        "HTTP/1.1 200 OK\\r\\n"
        "Content-Type: text/html; charset=utf-8\\r\\n"
        "Content-Length: %zu\\r\\n"
        "\\r\\n"
        "%s", body_len, body);

    if (len < 0 || len >= sizeof(response)) {
        perror("Response too large or formatting error");
        return;
    }

    if (send(fd, response, len, 0) == -1) {
        perror("Error sending response");
    }
}`;
  
    let codeBlock1;
    let codeBlock2;
    
    onMount(() => {
      if (codeBlock1) {
        hljs.highlightElement(codeBlock1);
      }
      if (codeBlock2) {
        hljs.highlightElement(codeBlock2);
      }
    });
</script>
  
  <article class="ml-2 dark:text-neutral-300">
    <h2 class="text-3xl mt-4 manrope">
      Sculpt 
      <span class="text-lg text-center">
        <span class="px-2">•</span> 
        A Minimal C HTTP server framework providing direct socket access for maximum user control.
      </span>
    </h2>
    
    <p><a href="https://github.com/mgcvale/sculpt" target="_blank">Sculpt</a> is a C HTTP Framework for Linux, which I built from scratch using raw sockets and epoll.</p>
    
    <p class="pb-2">
      What sets it apart from other frameworks is that it gives the user full control over the network sockets,
      allowing them to handle data transmission and reception in the way they deem most effective. This is particularly useful in performance-critical scenarios, 
      where the user can implement their own buffering and reading strategy.
    </p>

    <p>
      I originally built it for my  <a href="https://github.com/mgcvale/opensync">opensync</a> project, 
      since I couldn't find a framework that handled high-performance file uploads the way I needed. 
      However, early in Sculpt's development, I realized how challenging it is to build a solid HTTP framework, 
      and ultimately decided not to use it for opensync.
    </p>
    
    <p>
      For that reason, the project's development is currently stalled. 
    </p>
    
    <h3>Sculpt's API overview and features</h3>
    
    <p>As mentioned earlier, Sculpt is relatively minimal. However, it does offer some helper functions to make simple operations more streamlined.</p>
    
    <p class="pb-2">Here's the code for a basic hello world program in Sculpt:</p>
    
    <div class="bg-gray-100 dark:bg-gray800 rounded-md overflow-hidden shadow-sm">
      <div class="flex bg-gray-200 dark:bg-gray-700 px-4 py-1 text-sm text-gray-700 dark:text-gray-300 font-mono">
        <span>C</span>
      </div>
      <div class="overflow-x-auto">
        <pre class="p-4 m-0 font-mono"><code bind:this={codeBlock1} class="language-c hljs font-mono">{code1}</code></pre>
      </div>
    </div>

    <p class="py-4 pb-6">As you can see, helper functions like sc_easy_send and structures like sc_headers make it more manageable. However, as I said, you can still absolutely use raw sockets:</p>
    <div class="bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden shadow-sm">
        <div class="flex bg-gray-200 dark:bg-gray-700 px-4 py-1 text-sm text-gray-700 dark:text-gray-300 font-mono">
          <span>C</span>
        </div>
        <div class="overflow-x-auto">
          <pre class="p-4 m-0 font-mono"><code bind:this={codeBlock2} class="language-c hljs font-mono">{code2}</code></pre>
        </div>
    </div>
    <p class="py-2 pt-0 text-sm text-neutral-500 dark:text-neutral-400">
        Note that while Sculpt reads the headers and HTTP message for you (shown by the existence of sc_http_msg and sc_headers on the handlers), it parses the headers but leaves the request body unread, so you can read it manually from the socket or with sc_easy_recv.
    </p>

    <p>
        Sculpt also supports the creation of custom HTTP-style protocols. You can set the protocol to custom with <code class="bg-neutral-300 dark:bg-neutral-600 px-1 py-0.5 rounded-sm text-sm">{'mgr->protocol = SC_PROTOCOL_CUSTOM'}</code>, and then set both <code class="bg-neutral-300 dark:bg-neutral-600 px-1 py-0.5 rounded-sm text-sm">{'mgr->protocol_handler'}</code> and <code class="bg-neutral-300 dark:bg-neutral-600 px-1 py-0.5 rounded-sm text-sm">{'mgr->protocol_fallback'}</code>
        -  which will be run as the data for a request arrives and when a bug happens, respectively (e.g., in an HTTP protocol implementation, you would parse the HTTP message and headers in protocol_handler, and return stuff like 400 bad request in the protocol_fallback).
    </p>

    <h3 class="pb-0">
        Sculpt's architecture
    </h3>
    <p class="text-lg pb-2">
        Let’s dig into the more technical details.
    </p>
    <p>
        Sculpt uses Linux sockets for networking and epoll for async I/O.
    </p>
    <h4 class="pt-5 pb-0">
        1- Initial setup
    </h4>
    <p class="pb-2">
        Via sc_mgr_* functions, Sculpt sets up a sockets webserver, and stores the data about it in struct _sc_mgr (sc_conn_mgr). This is the main data it stores:
    </p>
    <ul class="list-disc pl-8">
        <li>Address info</li>
        <li>A connection pool, with its associated configs (max_age, timeout, max_conn, etc)</li>
        <li>The main server file descriptor</li>
        <li>epoll's data (for asynchronous I/O)</li>
        <li>The server's endpoints</li>
        <li>Custom protocol data</li>
        <li>Other misc info (log level, connection recycling policy, etc)</li>
    </ul>

    <h4 class="pt-5 pb-0">
        2- Asynchronous I/O setup
    </h4>
    <p class="pb-2">
        Via sc_mgr_epoll_init, Sculpt starts its main component: epoll -handling asynchronous data IO between the server and multiple clients.
    </p>
    <p>Sculpt uses epoll in level-triggered mode - meaning it always reports a client's file descriptor when it has data, as that is easier to manage than edge-triggered mode, especially with non-blocking IO.</p>
    <p>Furthermore, Sculpt also supports non-blocking IO, with the use of O_NONBLOCK in epoll, and proper EWOULDBLOCK parsing.</p>
    <p>It also uses EPOLLONESHOT for explicit connection state management</p>

    <h4 class="pt-5">
        3- Main IO loop
    </h4>

    <p>
        Finally, we have the main IO loop, operated by sc_mgr_poll(). In it, multiple things happen:
    </p>
    <ol class="pl-8">
        <li class="pb-2">1. <span class="font-semibold">Sculpt waits for epoll events with epoll_wait</span>: Sculpt waits for epoll events, which can be new connections, new requests or other events. It stores the amount of events in an integer.</li>
        <li class="pb-2">2. <span class="font-semibold">Sculpt loops through all the events</span>: Depending on the type of event, Sculpt does a specific action:
            <ol class="pl-2">
                <li>2.1. <span class="font-semibold">New connection</span>: Sculpt calls create_new_connection(), which stores it in the connection pool and registers it in epoll with non-blocking flags.</li>
                <li>2.2. <span class="font-semibold">Old connection</span>: Sculpt performs a list of actions: 
                    <ol class="pl-2">
                        <li>2.2.1. <span class="font-semibold">Error handling</span>: Sculpt handles basic epoll errors, such as connection closings and internal epoll errors.</li>
                        <li>2.2.2. <span class="font-semibold">Header parsing</span>: If all is OK, Sculpt reads all the headers from the client, parses them, and stores them in a non-blocking, delimited way—without interfering with the request's body. Remember: Sculpt lets the user read their request's body, so we can't read into it here. If using a custom protocol, the protocol's handler and fallback are called here.</li>
                        <li>2.2.3. <span class="font-semibold">Routing</span>: With the headers and http message, Sculpt routes the request to the adequate handler. The endpoints are stored in a linked list, so it loops through that. If no endpoint is found, Sculpt returns 404.</li>
                        <li>2.2.4. <span class="font-semibold">Connection re-adding</span>: If the connection had keep-alive in its headers, Sculpt readds it to epoll with epoll_readd_conn(), configuring it as non-blocking and updating its connection pool metadata. This is necessary due to EPOLLONESHOT.</li>
                        <li>2.2.5. <span class="font-semibold">Connection closing</span>: If the connection doesn't have keep-alive, Sculpt removes it from the conn pool and deletes it in epoll, with sc_mgr_conn_pool_release().</li>
                    </ol>
                </li>
                <li>2.3. <span class="font-semibold">Error handling</span>: Sculpt logs and handles the errors accordingly</li>
            </ol>
        </li>
    </ol>
    <p>For more info on all this stuff, you can check Sculpt's code directly. the sc_mgr_poll() function is defined in src/sculpt_conn.c, in <a href="https://github.com/mgcvale/sculpt" target="_blank">Sculpt's github.</a></p>
    
    <h3 class="pb-0">Sculpt's (current) limitations</h3>
    <p class="text-md pb-2">
        Although Sculpt works well for its intended scope, it still has some limitations, which hinder its ability to be used in actual production services. Below are the main ones
    </p>

    <h4 class="pt-5 pb-0">
        1- Lack of HTTPS/SSL
    </h4>
    <p>
        Currently, Sculpt lacks SSL, which really hampers its ability to be used in actual, real-world applications. No SSL means no HTTPS, limiting its use to local networks and IOT.
    </p>
    <p>
        Although adding it is something I want to do, Sculpt is already a bit complex - and adding SSL via OpenSSL is not an easy task for me. I have loads of other projects I want to work on, so I don’t really have time for this right now, but maybe I’ll get to it someday.
    </p>

    <h4 class="pt-5 pb-0">
        2- More robust header parsing, connection management and error handling
    </h4>
    <p>
        Currently, Sculpt does the bare minimum when it comes to these areas. It parses headers, handles basic errors and does the minimum when it comes to connection management.
    </p>
    <p>
        That said, a production-ready framework needs more than just the basics. It should catch malformed requests, handle timeouts and persistent connections cleanly, validate incoming headers, and return proper error responses when things go wrong.
    </p>
    
    
    <h4 class="pt-5 pb-0">
        3- More helper functions
    </h4>
    <p>
        Because Sculpt is pretty bare-bones, some basic helper functions (like sc_easy_send) are essential - but the framework lacks quite a few of them.
    </p>
    <p>
        Functions like sc_easy_recv, sc_easy_conn_close and sc_easy_recv_nonblock are pretty basic, but are still missing from Sculpt.
    </p>
    
    <h4 class="pt-5 pb-0">
        4- Thread safety
    </h4>
    <p class="pb-3">
        As a performance-oriented framework, thread-safety and multithreading support is also pretty important, but Sculpt lacks that.
    </p>

    <h3>
        How can I help Sculpt?
    </h3>

    <p>
        If Sculpt sounds interesting and you’d like to help out, contributions are more than welcome!
    </p>
    <p>
        You can submit issues or create forks at Sculpt's <a href="https://github.com/mgcvale/sculpt" target="_blank">github</a>, or hit me up at miguelcvalealt@gmail.com for ideas/suggestions.
    </p>

  </article>

  <style>
    /* Custom styling for code highlighting */
    :global(.hljs) {
      background: transparent;
      color: #333;
      font-size: 0.9rem;
      line-height: 1.5;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    
    :global(.dark .hljs) {
      color: #d4d4d4;
    }
    
    /* Ensure all code elements have monospace font */
    :global(pre), :global(code), :global(.language-c), :global(.hljs *) {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace !important;
    }
    
    /* Syntax highlighting colors - gray-ish theme */
    :global(.hljs-keyword) { color: #4b5563; }
    :global(.hljs-built_in) { color: #4b5563; }
    :global(.hljs-type) { color: #6b7280; }
    :global(.hljs-literal) { color: #4b5563; }
    :global(.hljs-number) { color: #6b7280; }
    :global(.hljs-regexp) { color: #6b7280; }
    :global(.hljs-string) { color: #6b7280; }
    :global(.hljs-subst) { color: #6b7280; }
    :global(.hljs-symbol) { color: #6b7280; }
    :global(.hljs-class) { color: #6b7280; }
    :global(.hljs-function) { color: #4b5563; }
    :global(.hljs-title) { color: #4b5563; }
    :global(.hljs-params) { color: #6b7280; }
    :global(.hljs-comment) { color: #9ca3af; font-style: italic; }
    :global(.hljs-doctag) { color: #9ca3af; }
    :global(.hljs-meta) { color: #9ca3af; }
    :global(.hljs-section) { color: #4b5563; }
    :global(.hljs-tag) { color: #4b5563; }
    :global(.hljs-name) { color: #4b5563; }
    :global(.hljs-attr) { color: #6b7280; }
    :global(.hljs-attribute) { color: #6b7280; }
    :global(.hljs-variable) { color: #6b7280; }
    
    /* Dark mode overrides */
    :global(.dark .hljs-keyword) { color: #9ca3af; }
    :global(.dark .hljs-built_in) { color: #9ca3af; }
    :global(.dark .hljs-type) { color: #d1d5db; }
    :global(.dark .hljs-literal) { color: #9ca3af; }
    :global(.dark .hljs-number) { color: #d1d5db; }
    :global(.dark .hljs-regexp) { color: #d1d5db; }
    :global(.dark .hljs-string) { color: #d1d5db; }
    :global(.dark .hljs-subst) { color: #d1d5db; }
    :global(.dark .hljs-symbol) { color: #d1d5db; }
    :global(.dark .hljs-class) { color: #d1d5db; }
    :global(.dark .hljs-function) { color: #9ca3af; }
    :global(.dark .hljs-title) { color: #9ca3af; }
    :global(.dark .hljs-params) { color: #d1d5db; }
    :global(.dark .hljs-comment) { color: #6b7280; font-style: italic; }
    :global(.dark .hljs-doctag) { color: #6b7280; }
    :global(.dark .hljs-meta) { color: #6b7280; }
    :global(.dark .hljs-section) { color: #9ca3af; }
    :global(.dark .hljs-tag) { color: #9ca3af; }
    :global(.dark .hljs-name) { color: #9ca3af; }
    :global(.dark .hljs-attr) { color: #d1d5db; }
    :global(.dark .hljs-attribute) { color: #d1d5db; }
    :global(.dark .hljs-variable) { color: #d1d5db; }
  </style>