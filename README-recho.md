# Recho's fork of wenyan

This fork adds what [Recho](https://github.com/recho-dev/recho) needs to run wenyan programs as notebooks:

- `splitCells(source)` splits a program into cells: runs of whole lines that compile and run on their own. A cell ends after a line where no block is open and no value is pending (`夫「甲」。` and `書之。` stay together). See `src/parser.ts` and `test/split.test.ts`.
- The JS transpiler takes an optional `onOp(index, {depth, pending})` callback, which `splitCells` uses.
- `獨行此` ("run this on its own") … `云云` is a block with its own scope, like `{ … }` in JavaScript: it compiles to a function called right away, so names declared inside stay inside, while names from outside can still be changed. With `乃得`, the block hands out a value, e.g. `獨行此。…乃得「積」。云云。名之曰「乙」。`. The Python and Ruby targets compile it to a plain block without its own scope.
- `示之` ("show it") is a new keyword used like `書之`: it takes the pending values, but compiles to `echo(…)` instead of `console.log(…)`, so a host such as Recho can show them inline. `書之` is unchanged. The Python and Ruby targets print for both.
- `npm run build:recho` builds an ES module bundle with type declarations into `dist/recho/`. It is committed so the repo can be used as a GitHub dependency:

  ```json
  "wenyan": "github:recho-dev/wenyan#master"
  ```

  Rebuild and commit `dist/recho/` after changing `src/`, and bump the
  version (`0.4.0-recho.N`). Bundlers such as webpack cache dependencies by
  version, so without a bump they keep serving the previous build.

The upstream `publish` script (bump the version and publish to npm) is renamed to `publish:npm`. pnpm runs a package's `publish` script when it installs the package from git, so leaving it in place would try to publish whenever Recho installs this fork.

The `splitCells` change is meant to be proposed upstream.
