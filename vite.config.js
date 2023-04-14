import { resolve } from 'path'
import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl';

// const proxyPrefix = 'https://maps.kosmosnimki.ru';
export default defineConfig({
	plugins: [
		glsl(),
	],
})