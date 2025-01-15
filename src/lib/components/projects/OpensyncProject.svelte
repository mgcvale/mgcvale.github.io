<a class="logo" href="https://github.com/mgcvale/opensync-backend" target="_blank">
    <svg xmlns="http://www.w3.org/2000/svg" width="79.2pt" height="79.2pt" viewBox="0 0 79.2 79.2">
        <defs></defs>
        <g id="group0" transform="translate(3.6, 3.6)" fill="none">
            <path id="shape0" fill="currentColor" fill-rule="evenodd" stroke-opacity="0" stroke="#000000" stroke-width="0" stroke-linecap="square" stroke-linejoin="bevel" d="M0 0L0 33.6L14.4 48L33.6 48L38.4 52.8L48 52.8L33.6 38.4L19.2 38.4L9.6 28.8L9.6 9.6L28.8 9.6L38.4 19.2L38.4 33.6L52.8 48L52.8 38.4L48 33.6L48 14.4L33.6 0L0 0" sodipodi:nodetypes="ccccccccccccccccccc"></path>
            <path id="shape1" transform="translate(14.4, 52.8)" fill="currentColor" fill-rule="evenodd" stroke-opacity="0" stroke="#000000" stroke-width="0" stroke-linecap="square" stroke-linejoin="bevel" d="M14.4 0L0 0L19.2 19.2L48 19.2L38.4 9.6L24 9.6L19.2 4.8" sodipodi:nodetypes="ccccccc"></path>
            <path id="shape2" transform="translate(52.8, 14.4)" fill="currentColor" fill-rule="evenodd" stroke-opacity="0" stroke="#000000" stroke-width="0" stroke-linecap="square" stroke-linejoin="bevel" d="M0 0L0 14.4L9.6 24L9.6 43.2L19.2 52.8L19.2 19.2" sodipodi:nodetypes="cccccc"></path>
        </g>
    </svg>
    <span class="work-sans">opensync</span>
</a>
<div class="ml-2">
    <h3 class="text-xl mt-4">Opensync - Lightweight, fast and open-source self-hosted file backup system</h3>
    <p>Out of furstration with Google Photos' shady subscription tactics and limited phone storage, the Opensync project was born. It seeks to transform unused space on home computers into a convenient solution for mobile photo and file storage.</p>

    <h2 class="mt-4">What Makes It Unique?</h2>
    <p>Today, most file backup systems are subscription-based and hosted on the cloud, with few open-source and self-hosted options available. Furthermore, the open-source solutions that do exist rarely offer automatic integration with phone photos (like Google Photos) while maintaining a streamlined feature set and performant backend.</p>
    <p>Opensync aims to fill this gap, offering a streamlined and performant backend written in C, and a multi-platform frontend with seamless integration and bloat-free interface.</p>

    <h2 class="mt-4">How is this being done?</h2>
    <h3>The backend</h3>
    <p>In order to this project possible, our first priority was the backend, as one of our main goals was to build something performant and streamlined that could run on any hardware.</p>
    <p>The first obvious choice for the backend C. Since it wouldn't be too complex, scalability wouldn't be a major concern, and using C allowed us to minimize overhead.</p>

    <p class="mt-2">We had two options: use an existing framework, like Mongoose or libmicrohttpd, or handle requests directly with Berkeley Sockets. We chose the latter.</p>
    <p>At first glance, this may seem like a crazy decision, but it allowed us to do some pretty impressive things to optimize the server, such as creating custom protocols and keeping the overhead to an absolute minimum.</p>
    <p>However, we also wanted some level of abstraction. To achieve that, we encapsulated the low-level logic of the server in a pseudo-framework, which we aptly named <a href="https://github.com/mgcvale/sculpt" class="text-sky-700 dark:text-sky-300 hover:underline" target="_blank">Sculpt</a>, managing asynchronous I/O and basic parsing logic.</p>

    <h3>The frontend</h3>
    <p>Unlike the backend, the frontend didn’t need to be as focused on performance and streamlining.</p>
    <p>For that, we choose Svelte. It compiles into pure JS, CSS and HTML, and is known as one of the fastest reactive front-end JS Frameworks.</p>
    <p>Additionally, the stack also includes SCSS and Tailwind for styling.</p>

    <p class="mt-4">Here are its Github repos: <a href="https://github.com/mgcvale/opensync-backend" class="text-sky-700 dark:text-sky-300 hover:underline" target="_blank">Bakcend</a>, <a href="https://github.com/mgcvale/opensync-website" class="text-sky-700 dark:text-sky-300 hover:underline" target="_blank">Website</a>.</p>
</div>

<style lang="scss">
    .logo {
        height: fit-content;
        width: fit-content;
        background-color: rgba(20, 20, 20, 0.2);
        padding: .5rem 1rem;
        border-radius: 1rem;
        margin-top: 1rem;
        display: flex;
        justify-content: flex-start;
        gap: .5rem;
        align-items: center;

        span {
            font-size: 1.5rem;
        }

        svg {
            height: 2rem;
            width: 2rem;
        }
    }

    div p {
        font-family: "Manrope", "Exo 2", sans-serif;
        font-weight: 500;
        @apply text-neutral-900;
    }

</style>