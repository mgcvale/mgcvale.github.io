<script lang="ts">
    import { applicationState } from "../../../stores/applicationStore";


</script>

{#if $applicationState.language === "english"}
    <article>
        <h1>ABOUT</h1>
        <hr>

        <h3>Welcome to my portfolio!</h3>
        <p>Here you will find a collection of my work, projects, and ideas on various subjects.</p>
        <p>As you may have noticed, the layout of this website is quite unconventional. I wanted to design it like a desktop environment, which I thought would be an interesting break from all the other boring static websites.</p>
        <p>To navigate through the different pages, you can open new windows using the dock below (or the icons on the desktop, if you're on mobile). You can also maximize a window, minimize it, or close it. Additionally, you can move and resize them by clicking on its corners and header, or by pressing alt and holding anywhere on the window. With the alt key, use the left mouse button to move and the right mouse button to resize.</p>

        <h3>A little about me</h3>
        <p>I'm a student from Brazil, currently studying Computer Science and Machine Learning/Data Science.</p>
        <p>While tech generally fascinates me, I have a particular interest in low-level development and enjoy learning how things truly work "under the hood."</p>
        <p>In my projects, I usually value things like simplicity and optimization, often by cutting off unnecessary features or implementing my ideas in the most efficient manner possible.</p>
        <p>And, of course, I love Data Science and Machine Learning. I have participated in the IOAI 2025, in Beijing - China, and I enjoy tinkering with and developing problems related to machine learning in general.</p>

        <h3>A little about this website</h3>
        <p>This website was built primarily using Svelte, Tailwind CSS, SCSS, and TypeScript. In addition, I also utilized a few other resources to facilitate development, such as some Svelte components from <a target="_blank" class="text-sky-950 dark:text-sky-300" href="https://animation-svelte.vercel.app/">Svelte Aceternity UI</a>, and icons from <a target="_blank" class="text-sky-950 dark:text-sky-300" href="https://lucide.dev/guide/packages/lucide-svelte">lucide-svelte</a>. You can check the full code on my <a target="_blank" class="text-sky-950 dark:text-sky-300" href="https://github.com/mgcvale/mgcvale.github.io">Github</a>.</p>
    </article>
{:else}
    <article>
        <h1>SOBRE</h1>
        <hr>

        <h3>Bem-vindo ao meu portfólio!</h3>
        <p>Aqui você encontrará uma coleção dos meus trabalhos, projetos e ideias sobre diversos assuntos.</p>
        <p>Como você deve ter percebido, o layout deste site é bastante não convencional. Eu quis projetá-lo como um ambiente de desktop, o que achei que seria uma quebra interessante em relação aos sites estáticos chatos.</p>
        <p>Para navegar pelas diferentes páginas, você pode abrir novas janelas usando o dock abaixo (ou os ícones na área de trabalho, se estiver no celular). Você também pode maximizar uma janela, minimizá-la ou fechá-la. Além disso, você pode movê-las e redimensioná-las clicando nos cantos e no cabeçalho, ou pressionando alt e segurando em qualquer lugar da janela. Com o alt, use o botão esquerdo do mouse para mover e o botão direito para redimensionar.</p>

        <h3>Um pouco sobre mim</h3>
        <p>Sou um estudante brasileiro, atualmente estudando Ciência da Computação e Machine Learning/Data Science.</p>
        <p>Embora tecnologia geralmente me fascine, tenho um interesse particular em desenvolvimento de baixo nível e gosto de aprender como as coisas realmente funcionam "por baixo do capô" (under the hood).</p>
        <p>Nos meus projetos, costumo valorizar coisas como simplicidade e otimização, muitas vezes cortando recursos desnecessários ou implementando minhas ideias da maneira mais eficiente possível.</p>
        <p>E, claro, amo Ciência de Dados e Machine Learning. Já participei da IOAI 2025, em Pequim - China, e gosto de fuçar e desenvolver problemas sobre aprendizado de máquina em geral.</p>

        <h3>Um pouco sobre este site</h3>
        <p>Este site foi construído principalmente usando Svelte, Tailwind CSS, SCSS e TypeScript. Além disso, também utilizei alguns outros recursos para facilitar o desenvolvimento, como alguns componentes Svelte do <a target="_blank" class="text-sky-950 dark:text-sky-300" href="https://animation-svelte.vercel.app/">Svelte Aceternity UI</a>, e ícones do <a target="_blank" class="text-sky-950 dark:text-sky-300" href="https://lucide.dev/guide/packages/lucide-svelte">lucide-svelte</a>. Você pode conferir o código completo no meu <a target="_blank" class="text-sky-950 dark:text-sky-300" href="https://github.com/mgcvale/mgcvale.github.io">Github</a>.</p>
    </article>
{/if}