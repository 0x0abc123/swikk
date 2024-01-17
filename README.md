# swikk

A simple HTML/JS/CSS framework for building static documentation pages

Built using Svelte

## Get Started

```
npm install

# for dev, starts server
npm run dev

# build release files (output to ./public)
npm run build
```

## How to Structure Content

- Markdown files go in `./public/md`
- Other static files referenced from Markdown files go in`./public/file`
- Any static files linked from Markdown files in `./public/md` need to use relative paths e.g. `![Image Alt Text](../file/example.png)`
- There needs to be at least `./public/md/_home.md` and `./public/md/index.yaml`
- `./public/md/_home.md` is the initial page that is loaded
- `index.yaml` needs to be edited manually, it is not yet auto-generated
