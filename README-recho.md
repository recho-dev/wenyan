# Recho's fork of wenyan

This fork adds what [Recho](https://github.com/recho-dev/recho) needs to run wenyan programs as notebooks:

- `splitCells(source)` splits a program into cells: runs of whole lines that compile and run on their own. A cell ends after a line where no block is open and no value is pending (`夫「甲」。` and `書之。` stay together). See `src/parser.ts` and `test/split.test.ts`.
- The JS transpiler takes an optional `onOp(index, {depth, pending})` callback, which `splitCells` uses.
- `npm run build:recho` builds an ES module bundle with type declarations into `dist/recho/`. It is committed so the repo can be used as a GitHub dependency:

  ```json
  "wenyan": "github:recho-dev/wenyan#master"
  ```

  Rebuild and commit `dist/recho/` after changing `src/`.

The upstream `publish` script (bump the version and publish to npm) is renamed to `publish:npm`. pnpm runs a package's `publish` script when it installs the package from git, so leaving it in place would try to publish whenever Recho installs this fork.

The `splitCells` change is meant to be proposed upstream.
