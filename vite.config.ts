import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';


export default defineConfig({
	base: '/',
	plugins: [sveltekit()],
	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer],
		},
	},
	build: {
		outDir: 'build',
	},
	server: {
		host: '0.0.0.0',
		port: 5173,
	},
});
