# Example App: Search for Jamstack themes

[![Netlify Status](https://api.netlify.com/api/v1/badges/8ea4a941-e0e9-47bf-a60b-89675c9c4e03/deploy-status)](https://app.netlify.com/sites/stackbit-search-themes-example/deploys)

**Showcasing:** [Stackbit](https://stackbit.com), [Algolia](https://algolia.com) & [on-demand static generation](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths#fallback-true) with Next.js

**Live demo:** [stackbit-search-themes-example.netlify.app](https://stackbit-search-themes-example.netlify.app/).

<img width="1423" alt="image" src="https://user-images.githubusercontent.com/2673881/158059043-32ff7359-f008-4ed4-80be-db5691ac7a11.png">

The details of all themes in [jamstackthemes.dev](https://jamstackthemes.dev) is copied into this repo (see under `/content`).<br/>
Themes can be added & edited within the Stackbit UI, and are indexed to Algolia to power a fast search.

There are currently about ~1,000 themes, and each has its own page. To keep build times short, we're not actually generating all pages at build time. Rather, [we use Next's dynamic routes](./src/pages/theme/%5Bid%5D.js) + the `fallback` parameter to instruct Next to generate pages on demand. Meaning, once per page (after each deployment) only.


## How to run

### Running the site locally

If you don't have an existing Algolia account, create one (it's free).

1. Clone this repository, `cd` into it & `npm install`.
1. Copy `env.local.example` to `env.local` & set the needed Algolia settings (find them in Algolia's [API Keys screen](https://www.algolia.com/account/api-keys/)).
1. Index themes data to Algolia: `npm run index`.
1. Run your site in development mode: `npm run dev`.
1. You can now open [localhost:3000](http://localhost:3000).

### Visual editing in Stackbit

To edit the site in the Stackbit UI (a.k.a. [local dev](https://docs.stackbit.com/how-to-guides/local-development/)):
1. Install our CLI (if you haven't already): `npm i -g @stackbit\cli`.
1. Run `stackbit dev`.
1. Click the shown URL.

## Get answers

[Join us on Discord](https://discord.gg/HUNhjVkznH) for community support.
