# Teacher's Day — Reusable Web Template

A bare-bones but polished single-page template for creating five teacher-specific Teacher's Day pages.

## Stack
- Semantic HTML
- CSS variables + responsive CSS
- Vanilla JavaScript
- Anime.js CDN
- Lucide icon font CDN
- Shadcn/ui-inspired component philosophy (tokens, restrained UI, accessibility)

## Run
Open `index.html` directly, or use VS Code Live Server.

## Customize a teacher
Edit `js/teachers.js`:

```js
const TEACHER = {
  name: "Dr. A. Sharma",
  subject: "Physics",
  theme: "physics",
  joined: "2015",
  experience: "11 years",
  quote: "Curiosity is where every discovery begins."
};
```

Available themes: `physics`, `english`, `mathematics`, `chemistry`, `ai`.


## Replicate for 5 teachers
Copy the folder/page and change only:
1. `data-theme` in `<html>`
2. `TEACHER` object in `js/teachers.js`
3. Photo assets
4. Optional message/quotes

## Notes
The project intentionally keeps dependencies CDN-based so it can be hosted as a static site on GitHub Pages without a build step.
