<div>
    <img class="logo my-4" src="./src/resources/logos/jurai-text.png" alt="JurAI Logo">
</div>
<article class="ml-2 project-root dark:text-neutral-200">
    <h3 class="text-xl">JurAI - Simplifying Legal Processes with AI</h3>
    <p class="dark:text-neutral-200">JurAI is the final project for my Computer Science Technical Education course at Unicamp. It’s designed to help lawyers manage legal research, client interactions, and case requests using AI tools inspired by real-world legal challenges.</p>
    
    <h2 class="mt-4">What Makes It Unique?</h2>
    <p class="dark:text-neutral-200">When lawyers handle a new case, the most tedious part is researching precedents—sifting through countless cases, statutes, and regulations to identify relevant examples and build strong arguments. Legal databases are vast, and the documents are often lengthy and complex, making this process time-intensive.</p>
    <p class="dark:text-neutral-200">JurAI streamlines this by offering three AI tools to accelerate research and provide valuable insights, saving lawyers time and effort.</p>
    
    <h3 class="text-lg">1. Probability AI</h3>
    <p class="dark:text-neutral-200">Our first tool, Probability AI, analyzes a case summary to estimate the chances of winning, losing, or partially winning the case. This helps lawyers quickly assess the case's viability.</p>
    
    <h3 class="text-lg">2. Argument AI</h3>
    <p class="dark:text-neutral-200">The second AI reviews a case summary or detailed document and generates a list of successful arguments from similar cases. This gives lawyers actionable insights to strengthen their strategy and approach.</p>
    
    <h3 class="text-lg">3. Summary AI</h3>
    <p class="dark:text-neutral-200">Our third tool, Summary AI, extracts and condenses the key information a lawyer needs to understand about a case. It identifies critical details such as relevant statutes, precedent cases, and potential challenges, presenting them in a clear and organized summary.</p>
    <p class="dark:text-neutral-200">This tool mirrors what a lawyer would learn through extensive research, but it delivers the insights quickly and efficiently, allowing more time for strategic planning and client interaction.</p>

    <h2 class="mt-4">Our Team</h2>
    <p class="dark:text-neutral-200">Our team is composed of 4 people, including me. Here are our githubs, as well as the github page of the project:</p>
    <ul class="text-sky-700 dark:text-sky-300 mt-2">
        <li><a class="hover:underline" target="_blank" href="https://github.com/jurai-git">JurAI Github</a></li>
        <li><a class="hover:underline" target="_blank" href="https://github.com/mgcvale">My Github</a></li>
        <li><a class="hover:underline" target="_blank" href="https://github.com/wendelfrota">Wendel's Github</a></li>
        <li><a class="hover:underline" target="_blank" href="https://github.com/MateusDaroz">Mateus's Github</a></li>
        <li><a class="hover:underline" target="_blank" href="https://github.com/mandythegril">Amanda's Github</a></li>
    </ul>

    <h2 class="mt-4">Our Stack</h2>
    <h3 class="!text-2xl">Clients</h3>
    <p class="dark:text-neutral-200">Our project has unique clients for the 3 main platforms (mobile, desktop and web).</p>
    <ul class="mt-4 flex flex-col gap-1 ml-4">
        <li>
            <h3 class="inline !text-xl">Desktop:</h3> <p class="inline dark:text-neutral-200">Developed using Java's JavaFX Framework, avaliable for all major desktop platforms (MacOS, Windows, Linux and BSD).</p>
            <a href="https://www.youtube.com/watch?v=eDq4FR3fQdo" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline" >Demo</a> and
            <a href="https://github.com/jurai-git/jurai-desktop" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline">github repo</a>
        </li>
        <li>
            <h3 class="inline !text-xl">Web:</h3> <p class="inline dark:text-neutral-200">Developed using pure HTML, CSS and Javascript.</p>
            <a href="https://jurai-git.github.io" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline" >URL</a> and
            <a href="https://github.com/jurai-git/jurai-git.github.io" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline">github repo</a>
        </li>
        <li>
            <h3 class="inline !text-xl">Mobile:</h3> <p class="inline dark:text-neutral-200">Still under development using Flutter.</p>
            <a href="https://github.com/jurai-git/jurai-mobile" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline" >Github repo</a>
        </li>
    </ul>

    <h3 class="!text-2xl">Backend</h3>
    <p class="dark:text-neutral-200">
        Our main backend server was developed using Python's Flask framework, and utilizes other technologies such as SQLAlchemy's ORM. 
    </p>
    <p class="dark:text-neutral-200">
        We are also using a MySQL Database provided by Unicamp, and the server runs on uWSGI inside a Docker container, in a Linux system.
    </p>

    <h3 class="!text-2xl">AIs</h3>
    <p class="dark:text-neutral-200">
        The Artificial Intelligences on our services were also built using Python, with the Pytorch and TensorFlow libraries, and their models are being hosted on private Hugging Face repos.
    </p>
    <p class="dark:text-neutral-200">Furthermore, to obtain all the data to train the AIs, we had to mine lawsuit data on one of Brazil's courts of justice, TJMG. To do that, we used a combination of web scraping and reverse engineering to collect and process data. Some of the code used in this step is avaliable at one of our <a href="https://github.com/jurai-git/tjmg-scraper" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline">Github repos</a>, if you want to check it out!</p>

    <h2>Developing JurAI</h2>
    <p class="dark:text-neutral-200">If you became interested in the development process of some of JurAI's components, you can check some of my articles on it!</p>
</article>

<style lang="scss">
    .logo {
        height: clamp(2.5rem, 8vw, 72px);
    }

    article {
      margin-left: 0;
      padding-left: 0;

      p {
        font-family: "Manrope", "Exo 2", sans-serif;
        font-weight: 500;
        @apply text-neutral-700;
      }
    }
</style>
