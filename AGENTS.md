# AGENTS.md

## Cursor Cloud specific instructions

This repository (`rancher-traefik-extension`) is currently an empty scaffold with only a `README.md`. There are no source files, dependencies, build configurations, or runnable services yet.

### Repository State (as of initial setup)

- **No package manager files** (`package.json`, `yarn.lock`, `pnpm-lock.yaml`, etc.)
- **No source code** or build tooling
- **No Docker/container configuration**
- **No test framework** configured

### Expected Stack (based on project name)

Based on the repository name, this project is intended to be a **Rancher UI Extension for Traefik**. When code is added, expect:

- **Vue.js / TypeScript** frontend (Rancher extensions use the `@rancher/shell` framework)
- **Node.js** as the build toolchain
- **Rancher Dashboard** as the host platform for testing the extension
- **Traefik** as the target ingress controller

### Future Setup Notes

When the project is scaffolded (e.g., via `yarn create @rancher/extension`), future agents should:

1. Install dependencies using the package manager matching the lockfile
2. Run `yarn dev` or equivalent to start the development server
3. Lint with the configured linter (likely ESLint)
4. Run tests with the configured test framework
