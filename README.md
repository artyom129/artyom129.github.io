# artyom129.github.io

Portfolio of Koncha Artyom, Python backend and automation developer: [artyom129.github.io](https://artyom129.github.io/).

One static page in eleven languages: English, Russian, Kazakh, Spanish, French, German, Portuguese, Italian, Chinese, Japanese and Arabic (right to left). It shows SlotBridge, the booking platform that runs in production, nine projects with real screenshots and the test count of their last run, and four platform building blocks. It also has a four-step description of how a project goes and short answers to the questions clients ask first. The email button opens a message in the visitor's language with three questions ready. The first screen is a pixel city at night, drawn in code: lit windows carry notes with real scenarios from the projects' demo data. The page ends with the same city at sunrise.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page, English text inline |
| `style.css` | Ink palette, IBM Plex Sans and Mono, dark and light themes |
| `script.js` | Translations, language picker, scroll reveals, the SlotBridge refusal animation |
| `scene.js` | The pixel city: night behind the hero, sunrise behind the contact block |
| `assets/work/*.webp` | Screenshots taken from each project's `docs/screenshots` |

## Run locally

```bash
python -m http.server 8000
```

GitHub Pages serves `main` from the repository root. No build step.
