# V38 — iOS home-screen standalone navigation

Based strictly on the latest V37 files. No database, camera, research, touch, FOV or layout algorithms modified.

- Both `index.html` and `graph.html`: iOS standalone-capable meta tags, app title, status-bar style, manifest link.
- Added `manifest.webmanifest` with relative `start_url`, `scope`, `id`, and `display: standalone` for a single GitHub Pages project directory.
- Kept links within the same directory and browsing context (`./graph.html`, `./index.html`).
- No service worker or caching layer was added (avoids stale releases).

## Important iOS limitation

These settings support standalone navigation, but cannot forcibly hide browser chrome if iOS decides to open an out-of-scope page or an in-app browser. The home-screen icon may need to be deleted and re-added from Safari after deployment. Check actual installed start URL and same-origin/scope redirects.

## Regression checks

- Compared V37/V38 file inventory; only two HTML files modified, two new files added.
- HTML modifications limited to head metadata and relative link spelling; all inline scripts retained byte-for-byte.
- JavaScript syntax and ZIP integrity checked; real iOS tests not available.
