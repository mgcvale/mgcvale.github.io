import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';


export default defineConfig({
	plugins: [sveltekit()],
	base: './',
	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer],
		},
	},
});
