build:
	deno run -A build.ts 0.1.0

bundle:
	deno bundle src/mod.ts > dist/mod.ts

test:
	deno test --import-map=import_map.json

format:
	dprint fmt

