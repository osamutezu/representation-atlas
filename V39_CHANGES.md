# v39 — Portrait case details sheet
Base: v38 actual files, no data or existing JS files removed.

- Portrait-only (max 1100px) compact bottom sheet, 34dvh / max 340px by default.
- Optional 76dvh expanded mode using toolbar button or vertical toolbar swipe.
- Independently scrollable content; full case information remains available.
- Transformation / architectural transfer / mechanism etc. laid out as two columns; related case buttons also in two columns.
- Close button moved into sheet toolbar; existing close handler remains attached.
- On a newly selected case, return to compact mode and scroll to top.
- Landscape and desktop case-panel layouts not changed.
- H36, H31, H18 content remains present below the original details in the same scroll container.

Validation: JS syntax, file references and ZIP integrity checked. Real iPhone/iPad test still needed.
