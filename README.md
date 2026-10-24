# Analog Image Processor PWA v3

Based on PWA v2; SwiftUI v35 used as reference.

## Updated
- NIGHT VERSION: true circular scope based on min(width,height), feathered edges, scope size, zoom, crosshair, green intensity, grain controls.
- BLOB TRACKING: connected-component analysis instead of fixed grid boxes; variable bounding rectangles, coordinate labels, center marks, sparse edges.
- DATAMOSH: seeded block scatter, vertically elongated trails, wave distortion with wave scale, chroma bleed.
- All other PWA v2 effects and editor retained.

## Limitations
This is **not a complete feature-for-feature port** of SwiftUI v35. Other effects, controls, exact output fidelity, full-resolution rendering and localization require further audit/porting. Coordinate labels in v3 refer to the rendered canvas, not always the original photograph. The original SwiftUI project is unchanged.

Upload the contents (not ZIP) to the root of GitHub Pages repository. The updated sw.js cache key helps refresh installed PWAs.


## v4 — FISHEYE LENS
Added FISHEYE LENS as the 13th gallery item, without changing the existing 12 items. Includes FULL FRAME / CIRCULAR projection, radial distortion, field of view, zoom, adjustable optical center, circular edge softness, chromatic aberration, vignette and background. All processing is on-device.

Note: This is a browser-based approximation of a fisheye lens, not an optical calibration of a particular real lens. Existing SwiftUI v35 and previous PWA effects are not modified.


## v5 — Language and fisheye lens
- Japanese/English toggle in header, saved locally; settings labels are translated while effect identifiers remain stable.
- FISHEYE LENS adds DIRECTION (BULGE / PINCH) and CURVE (0–100). The radial mapping uses nonlinear atan/tan lens profiles.
- Existing effects, settings, presets, and PWA assets are retained.
- Browser syntax checked; iPhone/iPad testing not performed.
