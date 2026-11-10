# browsershot-landing

Static landing page for [Browsershot](https://github.com/fayez-nazzal/browsershot), served at
[browsershot.dev](https://browsershot.dev).

`public/` is the deployment; there is no build step and no runtime dependency.

## Local development

```sh
npm install
npm run dev
```

Wrangler serves `public/` at `http://localhost:8787/`, matching the deployed static-asset
behavior, including the 404 page.

## Verification

```sh
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8787/
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:8787/does-not-exist
npm run audit
```

`npm run audit` runs Lighthouse against the running local server.

## Deployment

Commits are deployed with Cloudflare Workers Static Assets using the `assets` directory
and `browsershot.dev` custom domain declared in `wrangler.jsonc`. After authenticating
Wrangler, run `npm run deploy`.
