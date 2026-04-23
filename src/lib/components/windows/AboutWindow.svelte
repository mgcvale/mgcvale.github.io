<script lang="ts">
    import { applicationState } from "../../../stores/applicationStore";
</script>

{#if $applicationState.language === "english"}
    <article>
        <h1>ABOUT</h1>
        <hr>

        <h3>Welcome!</h3>
        <p>Here you will find a collection of my work, projects, and ideas on various subjects.</p>
        <p>As you may have noticed, the layout of this website is quite unconventional. I wanted to design it like a desktop environment, which I thought would be an interesting break from all the other boring static websites.</p>
        <p>To navigate through the different pages, you can open new windows using the dock below (or the icons on the desktop, if you're on mobile). You can also maximize a window, minimize it, or close it. Additionally, you can move and resize them by clicking on its corners and header, or by pressing alt and holding anywhere on the window. With the alt key, use the left mouse button to move and the right mouse button to resize.</p>

        <h3>A little about me</h3>
        <p>I'm a Computer Science student at IC - Unicamp.</p>
        <p>While tech generally fascinates me, I have a particular interest in Machine Learning and Data Science. I represented Brazil at the <a href="https://ioai-official.org" target="_blank" class="text-sky-950 dark:text-sky-300">IOAI 2025</a> in Beijing, after placing among the national top 4 in ONIA (National AI Olympiad).</p>
        <p>Currently, I am particularly interested in fine-tuning techniques for multimodal models in low-resource languages (such as Portuguese) and in sharing ML knowledge through my participation in <a href="https://noic.com.br" target="_blank" class="text-sky-950 dark:text-sky-300">NOIC</a> and Iris - Unicamp, where I create AI and Data Science content.</p>
        <p>In my projects, I usually value simplicity and optimization, often by cutting off unnecessary features or implementing my ideas in the most efficient manner possible.</p>

        <h3>A little about this website</h3>
        <p>This website was built primarily using Svelte, Tailwind CSS and TypeScript. In addition, I also utilized a few other resources to facilitate development, such as some Svelte components from <a target="_blank" class="text-sky-950 dark:text-sky-300" href="https://animation-svelte.vercel.app/">Svelte Aceternity UI</a>, and icons from <a target="_blank" class="text-sky-950 dark:text-sky-300" href="https://lucide.dev/guide/packages/lucide-svelte">lucide-svelte</a>. You can check the full code on my <a target="_blank" class="text-sky-950 dark:text-sky-300" href="https://github.com/mgcvale/mgcvale.github.io">Github</a>.</p>

        <h3>Contact</h3>
        <p>Feel free to reach out at <a href="mailto:m306523@dac.unicamp.br" class="text-sky-950 dark:text-sky-300">m306523@dac.unicamp.br</a>.</p>
    </article>
{:else}
    <article>
        <h1>SOBRE</h1>
        <hr>

        <h3>Bem-vindo(a)!</h3>
        <p>Aqui você encontrará uma coleção dos meus trabalhos, projetos e ideias sobre diversos assuntos.</p>
        <p>Como você deve ter percebido, o layout deste site é bastante não convencional. Eu quis projetá-lo como um ambiente de desktop, o que achei que seria uma quebra interessante em relação aos sites estáticos comuns.</p>
        <p>Para navegar pelas diferentes páginas, você pode abrir novas janelas usando o dock abaixo (ou os ícones na área de trabalho, se estiver no celular). Você também pode maximizar uma janela, minimizá-la ou fechá-la. Além disso, você pode movê-las e redimensioná-las clicando nos cantos e no cabeçalho, ou pressionando alt e segurando em qualquer lugar da janela. Segurando o alt, use o botão esquerdo do mouse para mover e o botão direito para redimensionar.</p>

        <h3>Um pouco sobre mim</h3>
        <p>Sou estudante de Ciência da Computação no IC - Unicamp.</p>
        <p>Embora tecnologia em geral me fascine, tenho interesse particular em Machine Learning e Data Science. Representei o Brasil na <a href="https://ioai-official.org" target="_blank" class="text-sky-950 dark:text-sky-300">IOAI 2025</a>, em Pequim, após ficar entre os top 4 nacionais na ONIA (Olimpíada Nacional de Inteligência Artificial).</p>
        <p>Atualmente, estou particularmente interessado em técnicas de fine-tuning de modelos multimodais em idiomas de baixo volume (como o português) e em compartilhar conhecimento sobre ML, participando do <a href="https://noic.com.br" target="_blank" class="text-sky-950 dark:text-sky-300">NOIC</a> e da Iris - Unicamp, onde crio conteúdo de IA e Data Science.</p> 
        <p>Nos meus projetos, costumo valorizar a simplicidade e a otimização, muitas vezes cortando recursos desnecessários ou implementando minhas ideias da maneira mais eficiente possível.</p>

        <h3>Um pouco sobre este site</h3>
        <p>Este site foi construído principalmente usando Svelte, Tailwind CSS e TypeScript. Além disso, também utilizei alguns outros recursos para facilitar o desenvolvimento, como alguns componentes Svelte do <a target="_blank" class="text-sky-950 dark:text-sky-300" href="https://animation-svelte.vercel.app/">Svelte Aceternity UI</a>, e ícones do <a target="_blank" class="text-sky-950 dark:text-sky-300" href="https://lucide.dev/guide/packages/lucide-svelte">lucide-svelte</a>. Você pode conferir o código completo no meu <a target="_blank" class="text-sky-950 dark:text-sky-300" href="https://github.com/mgcvale/mgcvale.github.io">Github</a>.</p>

        <h3>Contato</h3>
        <p>Sinta-se à vontade para entrar em contato pelo e-mail <a href="mailto:m306523@dac.unicamp.br" class="text-sky-950 dark:text-sky-300">m306523@dac.unicamp.br</a>.</p>
    </article>
{/if}