# Rancher Traefik Extension

A Rancher UI Extension for operating Traefik Proxy Kubernetes CRDs from the Rancher Dashboard.

This repository targets Rancher `2.10+`, Rancher UI Extensions API `3.x`, and Traefik Proxy `v3.7.0`.

## What it adds

- A top-level Traefik product in Rancher Dashboard.
- A Traefik overview page with links to the most-used CRDs.
- Resource pages for:
  - `traefik.io.ingressroute`
  - `traefik.io.middleware`
  - `traefik.io.traefikservice`
  - `traefik.io.serverstransport`
  - `traefik.io.tlsoption`
  - `traefik.io.tlsstore`
  - `traefik.io.ingressroutetcp`
  - `traefik.io.ingressrouteudp`
- Traefik-specific list columns and detail summaries for the core HTTP routing resources.

## Prerequisites

- Linux or macOS
- Node.js `24` for the current `@rancher/extension@latest` scaffold
- Yarn `1.x`
- A Rancher backend URL for local development
- Traefik CRDs installed in the target cluster

## Development

Install dependencies:

```sh
yarn install
```

Run the Rancher development app:

```sh
API=<Rancher Backend URL> yarn dev
```

Open `https://127.0.0.1:8005` and sign in with an admin user. The Traefik extension is loaded by the development app.

## Build

Build the Traefik extension package:

```sh
yarn build-pkg traefik
```

The compiled package is written to `dist-pkg`.

Serve built packages for Rancher Developer Load:

```sh
yarn serve-pkgs
```

Then use Rancher Dashboard **Extensions -> Developer load** with the served UMD URL.

## Publish

The generated workflows in `.github/workflows` use Rancher's reusable extension workflows:

- `build-extension-charts.yml` publishes Helm chart assets to `gh-pages`.
- `build-extension-catalog.yml` publishes an Extension Catalog Image to `ghcr.io`.
- `build-extensions-test.yml` validates extension builds on pull requests.

For Helm chart releases, tag format must match the package folder and version:

```text
traefik-0.1.0
```
