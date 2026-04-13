# Professional Vite Paytree

A polished, GitHub Pages-ready personal paytree with:

- premium profile + social link layout
- horizontal value carousel for crypto and payment methods
- deep-link selection via query params (`?pay=monero`)
- mixed interaction modes (modal details or direct deeplink)

## Quick start

```bash
npm install
npm run dev
```

## Edit your profile

Update `src/App.tsx`:

- display name
- tagline
- bio

Replace `public/avatar.svg` with your own icon/avatar if preferred.

## Edit regular links

Update `src/data/links.ts`.

Each entry defines:

- `label`
- `href`
- `description`
- `icon` (from `react-icons/si`)

## Edit donation/payment methods

Update `src/data/payments.ts`.

Each method supports:

- `id`: unique key for deep-linking
- `mode`: `modal` or `direct`
- `address` / `username`
- `uriBuilder`: optional wallet URI builder
- `directUrl`: for immediate redirects (example: Cash App)
- `fallbackUrl`: backup destination

## Deep-link behavior

External links can preselect payment methods:

- `https://<site>/?pay=monero`
- `https://<site>/?pay=bitcoin&amount=0.01`
- `https://<site>/?pay=monero&amount=1.25&note=Project+Support`

Supported params:

- `pay` - payment method id from `src/data/payments.ts`
- `amount` - optional amount passed to URI builders
- `note` - optional payment memo/description

## GitHub Pages deployment

Workflow file: `.github/workflows/deploy.yml`

1. Push to the `main` branch.
2. In GitHub repository settings, ensure **Pages** source is set to **GitHub Actions**.
3. The workflow injects `VITE_BASE_PATH` automatically as `/<repo-name>/`.

## Performance and accessibility notes

- lazy-loaded payment modal component
- keyboard-visible focus styling
- touch-friendly horizontal carousel with snap behavior
- tree-shaken icon imports from `react-icons`
