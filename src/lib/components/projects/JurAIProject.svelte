<script>
    import { applicationState } from "../../../stores/applicationStore";

</script>

{#if $applicationState.language === "english"}
<div>
    <img class="logo my-4" src="https://mgcvale.dev/jurai.png" alt="JurAI Logo">
</div>
<article class="ml-2 project-root dark:text-neutral-200">
    <h3 class="text-xl">JurAI - Simplifying Legal Processes with AI</h3>
    <p class="dark:text-neutral-200">JurAI is the final project for my Computer Science Technical Education course at Unicamp. It’s designed to help lawyers manage legal research, client interactions, and case requests using AI tools inspired by real-world legal challenges.</p>
    
    <h3 class="mt-4">What Makes It Unique?</h3>
    <p class="dark:text-neutral-200">When lawyers handle a new case, the most tedious part is researching precedents, sifting through countless cases, statutes, and regulations to identify relevant examples and build strong arguments. Legal databases are vast, and the documents are often lengthy and complex, making this process time-intensive.</p>
    <p class="dark:text-neutral-200">JurAI streamlines this by offering two AI tools to accelerate research and provide valuable insights, saving lawyers time and effort.</p>
    
    <h4 class="text-lg">1. Probability AI</h4>
    <p class="dark:text-neutral-200">Our first tool, Probability AI, is a text classification model that analyzes a case summary to estimate the chances of winning, losing, or partially winning the case. This helps lawyers quickly assess the case's viability.</p>
    
    <h4 class="text-lg">2. Chat + RAG</h4>
    <p class="dark:text-neutral-200">Our second tool is a specialized AI Chatbot. This chat features a RAG (Retrieval Augmented Generation) system, which utilizes semantic searches within our database of over 300,000 lawsuits to provide the AI with relevant data on similar precedents.</p>
    <p class="dark:text-neutral-200">This tool mirrors the research and study process a lawyer would undertake when researching case law (jurisprudence), but performs it automatically using the semantic search system.</p>

    <h3 class="mt-4">The Stack</h3>
    <h4 class="!text-2xl">Clients</h4>
    <p class="dark:text-neutral-200">Our project has unique clients for the 3 main platforms (mobile, desktop and web).</p>
    <ul class="mt-4 flex flex-col gap-1 ml-4">
        <li>
            <h3 class="inline !text-xl">Desktop:</h3> <p class="inline dark:text-neutral-200">Developed using JavaFX + FluidFX.</p>
            <a href="https://www.youtube.com/watch?v=eDq4FR3fQdo" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline" >Demo</a> and
            <a href="https://github.com/jurai-git/jurai-desktop" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline">github repo</a>
        </li>
        <li>
            <h3 class="inline !text-xl">Web:</h3> <p class="inline dark:text-neutral-200">Developed using pure HTML, CSS and Javascript.</p>
            <a href="https://jurai-git.github.io" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline" >URL</a> and
            <a href="https://github.com/jurai-git/jurai-git.github.io" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline">github repo</a>
        </li>
        <li>
            <h3 class="inline !text-xl">Mobile:</h3> <p class="inline dark:text-neutral-200">Developed using Flutter.</p>
            <a href="https://github.com/jurai-git/jurai-mobile" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline" >Github repo</a>
        </li>
    </ul>

    <h3 class="!text-2xl">Backend</h3>
    <p class="dark:text-neutral-200">
        Our main backend server was developed using Python's Flask framework, and utilizes other technologies such as SQLAlchemy's ORM. 
    </p>
    <p class="dark:text-neutral-200">
        For data, we are using a MySQL Database provided by Unicamp, Redis for temporary data such as password recovery tokens, and Pinecone for storing the RAG embedding vectors.
    </p>

    <h3 class="!text-2xl">AIs</h3>
    <p class="dark:text-neutral-200">
        The Artificial Intelligences on our services were also built using Python, with the Pytorch and TensorFlow libraries, and their models are being hosted on private Hugging Face repos.
    </p>
    <p class="dark:text-neutral-200">Furthermore, to obtain all the data to train the AIs, we had to mine lawsuit data on one of Brazil's courts of justice, TJMG. To do that, we used a combination of web scraping and reverse engineering to collect and process data. Some of the code used in this step is avaliable at one of our <a href="https://github.com/jurai-git/tjmg-scraper" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline">Github repos</a>.</p>
</article>
{:else}
<div>
    <img class="logo my-4" src="https://mgcvale.dev/jurai.png" alt="Logotipo do JurAI">
</div>
<article class="ml-2 project-root dark:text-neutral-200">
    <h3 class="text-xl">JurAI - Simplificando Processos Jurídicos com IA</h3>
    <p class="dark:text-neutral-200">O JurAI é o projeto final do meu curso de Ensino Técnico em Informática na Unicamp. Ele foi projetado para auxiliar advogados a gerenciar pesquisas jurídicas, interações com clientes e solicitações de casos usando ferramentas de IA inspiradas em desafios reais do mundo jurídico.</p>
    
    <h3 class="mt-4">O Que o Torna Único?</h3>
    <p class="dark:text-neutral-200">Quando advogados assumem um novo caso, a parte mais cansativa é a pesquisa de precedentes: filtrar inúmeros casos, estatutos e regulamentos para identificar exemplos relevantes e construir argumentos sólidos. As bases de dados jurídicas são vastas e os documentos são frequentemente extensos e complexos, tornando esse processo extremamente demorado.</p>
    <p class="dark:text-neutral-200">O JurAI simplifica isso oferecendo duas ferramentas de IA para acelerar a pesquisa e fornecer insights valiosos, economizando tempo e esforço dos profissionais.</p>
    
    <h4 class="text-lg">1. IA de Probabilidade</h4>
    <p class="dark:text-neutral-200">Nossa primeira ferramenta, a IA de Probabilidade, é um modelo de classificação de texto que analisa o resumo de um caso para estimar as chances de vitória, derrota ou vitória parcial. Isso ajuda os advogados a avaliar rapidamente a viabilidade da causa.</p>
    
    <h4 class="text-lg">2. Chat + RAG</h4>
    <p class="dark:text-neutral-200">Nossa segunda ferramenta é um Chatbot de IA especializado. Este chat conta com um sistema de RAG (Retrieval Augmented Generation), que utiliza buscas semânticas em nosso banco de dados com mais de 300.000 processos para fornecer à IA dados relevantes sobre precedentes semelhantes.</p>
    <p class="dark:text-neutral-200">Essa ferramenta espelha o processo de estudo que um advogado realizaria ao pesquisar jurisprudência, mas o executa automaticamente através do sistema de busca semântica.</p>

    <h3 class="mt-4">A Stack</h3>
    <h4 class="!text-2xl">Clientes</h4>
    <p class="dark:text-neutral-200">Nosso projeto possui clientes exclusivos para as 3 principais plataformas (mobile, desktop e web).</p>
    <ul class="mt-4 flex flex-col gap-1 ml-4">
        <li>
            <h3 class="inline !text-xl">Desktop:</h3> <p class="inline dark:text-neutral-200">Desenvolvido utilizando JavaFX + FluidFX.</p>
            <a href="https://www.youtube.com/watch?v=eDq4FR3fQdo" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline" >Demo</a> e
            <a href="https://github.com/jurai-git/jurai-desktop" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline">repositório no github</a>
        </li>
        <li>
            <h3 class="inline !text-xl">Web:</h3> <p class="inline dark:text-neutral-200">Desenvolvido utilizando HTML, CSS e Javascript puros.</p>
            <a href="https://jurai-git.github.io" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline" >URL</a> e
            <a href="https://github.com/jurai-git/jurai-git.github.io" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline">repositório no github</a>
        </li>
        <li>
            <h3 class="inline !text-xl">Mobile:</h3> <p class="inline dark:text-neutral-200">Desenvolvido utilizando Flutter.</p>
            <a href="https://github.com/jurai-git/jurai-mobile" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline" >Repositório no Github</a>
        </li>
    </ul>

    <h3 class="!text-2xl">Backend</h3>
    <p class="dark:text-neutral-200">
        Nosso servidor backend principal foi desenvolvido utilizando o framework Flask (Python) e utiliza outras tecnologias como o ORM SQLAlchemy. 
    </p>
    <p class="dark:text-neutral-200">
        Para os dados, estamos utilizando um banco de dados MySQL fornecido pela Unicamp, Redis para dados temporários (como tokens de recuperação de senha) e Pinecone para armazenar os vetores de embedding do RAG.
    </p>

    <h3 class="!text-2xl">IAs</h3>
    <p class="dark:text-neutral-200">
        As Inteligências Artificiais dos nossos serviços também foram construídas com Python, utilizando as bibliotecas PyTorch e TensorFlow, e seus modelos estão hospedados em repositórios privados no Hugging Face.
    </p>
    <p class="dark:text-neutral-200">Além disso, para obter todos os dados para treinar as IAs, precisamos minerar dados de processos judiciais em um dos tribunais de justiça do Brasil, o TJMG. Para isso, utilizamos uma combinação de web scraping e engenharia reversa para coletar e processar os dados. Parte do código usado nesta etapa está disponível em um de nossos <a href="https://github.com/jurai-git/tjmg-scraper" target="_blank" class="text-sky-700 dark:text-sky-300 hover:underline">repositórios no Github</a>.</p>
</article>
{/if}

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