# Udesha Indunil — Updated Portfolio

A responsive, self-contained portfolio built with HTML, CSS and vanilla JavaScript. This edition preserves the supplied compact layout, About highlights, color palette and contact information, and expands the portfolio with My Internship, My Projects and My Contributions.

## Run the portfolio

1. Extract the complete ZIP.
2. Open the `udesha-indunil-portfolio` folder.
3. Double-click `index.html` to open it in a modern browser.

No npm installation or build command is needed. Keep the `assets` folder, `styles.css` and `script.js` alongside `index.html`. All images and the Sinhala font are included locally. External LinkedIn and Canva links require an internet connection and may ask visitors to sign in.

For automatic reload while editing, open the folder in VS Code and use Live Server. Alternatively, if Python is installed, run:

```sh
python -m http.server 8000
```

Then visit http://localhost:8000.

## Portfolio sections

- **About / Skills:** original supplied content and layout changes retained.
- **My Internship:** Creative Writer internship at HardTalk (Pvt) Ltd, November 2025–present, on-site in Colombo.
- **My Projects:** stage drama promotion, special-day content writing, Sannasa, Pen2Purpose, Viduneth and Kunjanada.
- **My Contributions:** NPRS 2026, the proposed Media Professionals Bill discussion, leadership roles, department events, industry volunteering and workshops.
- **Gallery:** the original six-photo NPRS gallery, now inside an expandable collection.
- **Contact:** the original LinkedIn contact route.

## Edit the content

- `index.html` contains all text, dates, photo references and external links.
- `styles.css` preserves the supplied styles and adds an “Expanded portfolio” section at the end.
- `script.js` handles the mobile menu, active-section indicator and photo viewer.
- `assets/images/` contains the portfolio photos and writing screenshots.
- `assets/fonts/` contains the offline Noto Sans Sinhala font and its license.
- `CONTENT-SOURCES.md` records the source mapping and content limitations.

To add a photo, copy a `.gallery-link` element and update its image, alternative text and caption. Give related photos the same `data-gallery` value so previous/next stays within that activity. For the NPRS gallery, the `data-gallery` attribute is inherited from its container.

The contribution collections use native HTML `<details>` elements. Add `open` to a `<details>` tag if you want that collection expanded when the page loads.

## Accessibility and behavior

Keyboard navigation, visible focus indicators, a skip link, grouped photo viewing, Escape to close, focus return, reduced-motion support and responsive navigation are included. The page and native expandable collections remain readable without JavaScript; image links then open the source files directly.

## Content and photo notes

Internship information was supplied directly by the user. Publicly accessible LinkedIn posts were reviewed for the additional activities. Award-ceremony participation is not presented as an award, volunteering is not presented as an internship, and the MISP entry describes Day 1 participation rather than completed certification.

Only one supplied photo could be confidently matched to the bill discussion. It is used there. The files named `image.png` and `image(1).png` are caption-writing samples, while `image(2).png` is the Sannasa performance, so these are shown under their matching projects.

The supplied Canva edit URL could not be previewed. It is included as a general project-document link, without assigning an unverified title or associating it with a specific project. A public view-only Canva link can replace it later if desired.

## Hosting

Upload `index.html`, `styles.css`, `script.js` and `assets/` to a static web host. No backend is required. The portfolio was packaged for download and has not been deployed.
