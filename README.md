# browsershot-landing

Static landing page for [Browsershot](https://github.com/fayez-nazzal/browsershot), served at
[browsershot.dev](https://browsershot.dev).

`public/` is the deployment; there is no build step and no runtime dependency.

The header, browser favicon, and Apple touch icon use the same simplified mark.
The favicon SVG is the source for the PNG icons and social card mark.
The page describes capture workflows for pull requests, coding agents, audit records, and authenticated pages.
The example command enables element inspection and browser error collection.
Paragraphs use CSS pretty wrapping, and headings use balanced wrapping where supported.

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
curl -sI http://localhost:8787/ | grep -Ei 'content-security-policy|x-frame-options|referrer-policy'
npm run audit
```

`npm run audit` runs Lighthouse against the running local server.

## Security headers

`public/_headers` applies security headers to every static asset response:

- `Content-Security-Policy: default-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Discovery and disclosure

`public/robots.txt` permits crawling and points to the sitemap. `public/llms.txt`
provides product context for AI tools and is linked from the homepage with
`rel="describedby"`. `public/ai.txt` describes crawler guidance (it is
informational, not a replacement for robots.txt). `public/humans.txt`
links to project contributors, and `public/ads.txt` declares no authorized ad sellers.
`public/.well-known/security.txt` links to the private vulnerability reporting policy;
review its expiry and contact regularly.

## Legal and email policies

`public/privacy.html` and `public/terms.html` are adapted from GitHub's CC BY 4.0
site policies, with source attribution included in each page. Review them when the
site's functionality or data practices change.

`public/.well-known/mta-sts.txt` declares no inbound mail policy because the domain
has Null MX and does not accept email. The `mta-sts.browsershot.dev` custom domain
serves the policy; keep its DNS TXT record ID synchronized if the policy changes.

## Deployment

Commits are deployed with Cloudflare Workers Static Assets using the `assets` directory
and custom domains declared in `wrangler.jsonc`. After authenticating Wrangler, run
`npm run deploy`.
