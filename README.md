# artyom129.github.io

Portfolio of Koncha Artyom, Python backend and automation developer: [artyom129.github.io](https://artyom129.github.io/).

One static page in English, Russian and Kazakh. It shows SlotBridge, the booking platform that runs in production, and seven projects with real screenshots and the test count of their last run. The console in the hero replays scenarios from the projects' demo data.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page, English text inline |
| `style.css` | Ink palette, IBM Plex Sans and Mono, dark and light themes |
| `script.js` | Russian and Kazakh strings, language switch, the moving log |
| `assets/work/*.webp` | Screenshots taken from each project's `docs/screenshots` |

## Run locally

```bash
python -m http.server 8000
```

GitHub Pages serves `main` from the repository root. No build step.
