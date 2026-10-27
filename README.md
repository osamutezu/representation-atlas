# Representation Atlas — Two-Layer Data World v16

## Run
Open `graph.html` in a modern WebGL-enabled browser. `index.html` is the original catalogue. `i18n.js` is included (was absent from v15 distribution).

## Experiment
- **Evidence space (experimental)**: Jaccard dissimilarity from existing `mechanism_ids`, followed by 3D classical MDS. No invented subjective numeric ratings. The original mechanism tags are **editorial annotations**, not independently verified objective facts. The 3D embedding distorts some pairwise distances; a small deterministic jitter separates coincident points.
- **Interpretive space**: four explicitly hypothetical, overlapping themes, constructed from existing mechanism tags; rendered as translucent 3D Gaussian fog. They do not assert actual historical influence or objective group boundaries.
- Users can switch between original layout and tag-similarity layout, toggle clouds, choose theme and opacity. 124 cases and 349 original edges are preserved.
- This is a **methodology prototype**, not a validated ontology. Next step: curate tag definitions, source citations, unknown states, and adjudication; assess embedding stress and stability.

## Limitations
- Current `mechanism_ids` are not externally audited, so the Evidence label refers to traceability of tags and computation, **not objectivity**.
- Clouds are kernel-based illustration; appearance varies with opacity and projection. Avoid interpreting their visible boundaries as data-derived classifications.
- Existing source `index.html` retains prior behaviour; only `graph.html` adds the two-layer controls.


## v17 — Continuous volumetric interpretive clouds
- Individual giant per-node cloud sprites replaced with a continuous sampled 3D Gaussian density field (25³ samples per selected theme).
- Field generated from ALL matching nodes per theme; overlapping kernels form a unified shared haze around clusters.
- Intensity slider range 0–300% (previously 5–100%), default 100%.
- Theme selection and original/evidence layout switches regenerate the field; camera motion does not.
- Clouds remain interpretive visualization, not verified boundaries.

## v18 連結した高密度の意味雲
- 同テーマの全ノードを最小全域木でつなぎ、線分への距離に応じた密度を既存のノード密度場に加算。これらの接続は描画補間であり、実際の研究上のエッジではない。
- 共通の3D格子（31³）でサンプリングし、連続した太い雲として表示。
- 雲の粒子径・不透明度を増加し、従来の薄い霧状表現を改善。濃度スライダーは0〜300%。
- 124事例の座標、既存のネットワークエッジ、探索操作、意味雲のテーマは変更しない。

## v19 — Surface cloud renderer
- Removed point-sprite density rendering. Implemented 3D scalar fields, smoothed outward normals, and marching tetrahedra iso-surfaces, with two nested surfaces per theme.
- Clouds are connected by visual minimum-spanning-tree interpolations, which are **not historical links**.
- Semi-transparent front/back triangle rendering provides coherent outer silhouettes and interior density, while preserving original WebGL nodes, edges, and labels.
- Cloud layer enabled by default at 165%, adjustable to 300%.
- Density thresholds, sigma, color and alpha are visual design choices, not measured category boundaries.

## v20 — Explore Field of View
- Based strictly on v19, preserving cloud surface renderer, node/edge/title and both map layers.
- Explore-only horizontal FOV slider 60°–120°, default 100°. Responsive vertical FOV derived from canvas aspect ratio. Orbit keeps 62° vertical FOV.
- Human binocular field spans approximately 200° horizontally including peripheral vision, but a conventional rectilinear camera at that FOV causes extreme distortion. The 100° default is a practical wide-angle first-person viewing approximation, **not** a claim to reproduce the full physiological field of view.
- Slider and value appear only in Explore. Bilingual label and accessibility name.

## v21 — Cloud density and Explore FOV
- Based on v20 (latest), retaining all pre-existing features.
- Cloud density range 0–200%, default 100% (shader cloudOpacity=1).
- Explore horizontal FOV slider 60°–180°, default 100°. A rectilinear pinhole projection is undefined at exactly 180°, so the endpoint uses an internal 179.5° cap to avoid division by zero. Extreme wide angles produce severe edge distortion.

## v22 — Numeric entry
- Based on v21, preserving all rendering, cloud meshes, and navigation.
- Cloud density: 0–100% integer, default 50%.
- Explore horizontal FOV: 60–180° integer, default 100°. 180° uses the existing 179.5° projection cap.
- Each parameter supports synchronized slider and number input. Only whole-number values in the slider range update the scene. Invalid/empty/out-of-range entries are reverted to the last accepted slider value on blur/change.

## v23 — 空白タップによる選択解除
- Orbit/Explore共通で、ドラッグではないキャンバスの空白クリック/タップ時に選択を解除し、詳細パネルを閉じます。
- ノード選択時は従来通り詳細を表示。UIパネル操作では解除しません。
- 最新v22から変更。

## v24 — Orbit analysis workspace
Built directly from v23. Orbit now defaults to orthographic projection, with perspective toggle, XY/XZ/YZ orthogonal camera presets, 3D preset, Fit control, and X/Y/Z section clipping. Section clipping applies to nodes, edges (segments removed if endpoints are outside) and cloud surfaces (per-fragment shader clipping). Explore keeps its perspective/FOV/movement settings. Note: edge clipping uses whole-edge filtering rather than partial-edge intersection. Camera remains centered at world origin as in previous versions.

## v25 — Spatial reference guides
- Built on v24. Orbit-only bounding wireframe fits the complete 124-node dataset with 8% padding per axis, recomputed from live coordinates so both layout modes work.
- Translucent cyan section plane follows the X/Y/Z slice slider and shows its coordinate.
- Optional sparse grid / frame+plane / off selector.
- Bottom-right camera-relative XYZ compass.
- Overlay is a projection on the existing label canvas; does not alter node positions, cloud geometry, or Explore navigation.
- XYZ axes are relative layout coordinates and do not imply physical measurement or fixed semantic meaning.

## v26 — Non-obstructive Orbit controls and 100×100 grid
- Based on v25. Orbit analysis controls are docked on the left, initially collapsed to a compact toggle; click to expand or close.
- Bounding box grid now uses 100 subdivisions along each direction on all six faces, with fine 0.25px strokes and every tenth line 0.5px; both are faint and configurable via the guide selector.
- Grid mode is the default; section plane and coordinate indicator remain intact.

## v27 — Distinct Orbit/Explore roles and shared grid
- Based directly on v26. Orbit zoom (wheel and two-finger pinch) is bounded by the padded bounding-box corner radius (+6%), so the Orbit camera stays outside the entire dataset in all view directions, including 3D and perspective.
- Orbit reset, fit and mode entry also enforce the same camera limit. Explore remains freely navigable inside the network.
- The grid visibility mode is shared between Orbit and Explore, with an Explore-only compact selector below the FOV controls; changing either selector synchronizes both.
- In Explore, frame/grid is visible but the Orbit section plane and Orbit orientation compass remain exclusive to Orbit.


## v28 Research integration (2026-10-24)
See `research/INTEGRATION_AUDIT.md`. Existing graph.html and index.html remain byte-identical to v27. Research data is kept separate pending review.
