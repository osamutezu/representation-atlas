# V37 requirements regression audit

Source: local latest v36 `graph.html`. The checks below are static checks of retained code/controls, **not proof of actual iOS browser operation**.

- [x] Latest actual base v36
- [x] 124 case marker
- [x] 349 edges retained
- [x] Orbit / Explore / Focus
- [x] FOV 60–180 and numeric input
- [x] FOV applies to projection
- [x] FOV portrait accessible
- [x] FOV landscape in side dock
- [x] Orbit XY/XZ/YZ sections
- [x] Orbit orthographic/perspective
- [x] Grid and bbox
- [x] Cloud density 0–100
- [x] Language Japanese/English
- [x] Portrait top/bottom landscape left/right
- [x] Touch pinch and drag
- [x] Mobile directional 3.5x
- [x] H36 H31 H18
- [x] Node select and details
- [x] Search and filters
- [x] JSON export
- [x] XYZ overlay

## JS syntax
- [x] inline0
- [x] inline1
- [x] inline2
- [x] inline3
- [x] inline4
- [x] inline5
- [x] inline6
- [x] inline7
- [x] inline8
- [x] i18n.js
- [x] h36.js
- [x] h31.js
- [x] h18.js

## Remaining limitations
- iPhone/iPad physical browser testing pending.
- Current app still uses 124 unverified cases and 349 research links; external research CSVs are not yet merged.
- Some original bilingual strings are incomplete; current i18n logic is preserved, not certified complete.
- FOV is horizontal in Explore (60–180°), default 100°. Orbit uses its own projection logic.
