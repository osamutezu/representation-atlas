# V36 — touch navigation and compatibility contract
Based on v35 actual files. Existing features and dataset preserved.

## Changes
- Pinch zoom is proportional to finger spacing in Orbit; Explore moves camera along its actual 3D forward vector, including pitch.
- Corrected reversed horizontal swipe in Explore (finger right looks right). Orbit rotation behavior retained.
- On-screen directional buttons now move at 3.5x the former speed; keyboard speed unchanged.
- Two-finger to one-finger transitions no longer create sudden camera jumps; taps still select nodes.

## Non-regression contract
- Never remove earlier requirements without an explicit superseding instruction.
- Mobile portrait: controls top/bottom, center 3D; landscape: side controls, center 3D.
- Keep 124 cases, 349 links, bilingual UI, Orbit, Explore, Focus, XYZ, XY/YZ/ZX sections, H36/H31/H18, clouds, and controls.
- New releases must start from latest actual files and verify feature inventory.

## Validation
Static JavaScript checks and ZIP integrity only; iOS/iPadOS gesture regression testing is still required.
