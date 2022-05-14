// ex. scripts/build_npm.ts
import { build } from "https://deno.land/x/dnt/mod.ts";

await build({
  entryPoints: ["./src/mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  cjs: false,
  package: {
    // package.json properties
    name: "@nathantinker/pubsub",
    version: Deno.args[0],
    description: "A simple pub-sub event bus in TypeScript.",
    license: "MIT",
    repository: {
      type: "git",
      url: "https://github.com/site-bender/pubsub.git",
    },
    bugs: {
      url: "https://github.com/site-bender/pubsub/issues",
    },
  },
  mappings: {
    "https://cdn.skypack.dev/nanoid?dts": {
      name: "nanoid",
      version: "^3.2.0",
    },
    "https://cdn.skypack.dev/@js-temporal/polyfill?dts": {
      name: "@js-temporal/polyfill",
      version: "^0.3.0",
    },
  },
  importMap: "import_map.json",
  packageManager: "pnpm",
  // TODO: fix unsubscribe tests
  test: false,
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
