import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "index.ts"),
			formats: ["es"],
			name: "@sitebender/pubsub",
		},
	},
	test: {
		setupFiles: ["vitest-localstorage-mock"],
		mockReset: false,
	},
})
