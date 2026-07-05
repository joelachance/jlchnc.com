---
title: Footnotes Demo
date: 2026-07-03
slug: footnotes-demo
category: Writing
---

## 01: Current State

The software industry is growing quickly, and developer tooling is evolving even faster. AI-assisted coding has moved from novelty to default workflow for many teams. [^1] Meanwhile, the gap between prototyping and production keeps shrinking. [^2]

This post is a layout demo. Scroll through the sections to see footnotes appear on the right. Each section should highlight as it crosses the scroll anchor, and only that section's notes should be visible on desktop.

Developers now expect tools to meet them where they work: in the editor, in the terminal, in the browser. [^3] The best experiences feel ambient rather than interruptive — suggestions arrive in context, not in a separate tab you have to hunt down.

[^1]: Github Octoverse (2025) — [report](https://github.blog/news-insights/octoverse/)
[^2]: State of Vibe Coding (2025) — [survey](https://www.producthunt.com/)
[^3]: Stack Overflow Developer Survey (2025) — [results](https://survey.stackoverflow.co/)

## 02: Why Side Notes

Traditional footnotes sit at the bottom of the page. That works for print, but on the web you lose context by the time you scroll down.

Placing notes beside the section keeps references close to the claim they support. The active section highlights as you scroll, and only its footnotes show on desktop. [^4] This pattern is sometimes called a *sidenote* or *margin note*.

Edward Tufte argued that dense information deserves dense layout — notes belong near the data they annotate, not banished to a separate page. [^5] Web typography has finally caught up: CSS grid and sticky positioning make side-by-side reading practical on large screens.

On smaller viewports, notes collapse below the section body. The scroll behavior still works; you just read vertically instead of horizontally.

[^4]: Nielsen Norman Group — [reading patterns on the web](https://www.nngroup.com/articles/how-users-read-on-the-web/)
[^5]: Tufte, *The Visual Display of Quantitative Information* — sidenotes as a reading pattern.

## 03: How Parsing Works

Add a panel post as markdown with `##` section headings and `[^id]:` definitions at the end of each section. Inline references use `[^id]` in the body text. [^6]

The parser splits on `##` headings, then extracts footnote definitions from the bottom of each section. Definitions must use the `[^id]:` syntax — the id can be numeric or alphanumeric. [^7] Order of definition determines display numbering within a section.

Body text is rendered as simple markdown: paragraphs, links, emphasis. Footnote refs in the body become superscript-style markers that link to the sidenote list. [^8]

[^6]: See `lib/panels.ts` — `parsePanelPost` and `parseFootnotes`.
[^7]: Footnote ids are scoped per section, so `[^1]` in section 02 is independent of `[^1]` in section 01.
[^8]: `components/panel-markdown.tsx` — `replaceFootnoteRefs` maps ids to section-local indices.

## 04: Scroll Activation

The active panel is chosen by comparing each section's top edge against a scroll anchor point. [^9] The anchor sits below the site header and shifts slightly based on viewport height — roughly 72% down the screen at most.

When you scroll back to the very top, the anchor recalibrates from the first panel's position. [^10] This prevents the first section from losing "active" status too early on short viewports.

Only the active panel gets `thesis-panel--active`. Its footnote column loses `aria-hidden` and `inert`, so keyboard focus can reach links inside the notes. [^11] Inactive panels hide their notes from assistive tech.

[^9]: `components/post-panels.tsx` — `pickActive` in the scroll listener.
[^10]: Recalibration triggers when `scrollY < 24`.
[^11]: The `inert` attribute prevents tab focus from landing on hidden sidenotes.

## 05: Typography and Rhythm

Panel headings use a distinct weight and size from essay titles. Body copy follows the site's prose scale — comfortable line length in the main column, slightly smaller type in the sidenote column. [^12]

Footnote numbers are generated with CSS counters (`counter(thesis-fn)`), not hard-coded in the markup. [^13] That keeps numbering correct even if you reorder definitions in the source file.

Links inside footnotes inherit the muted sidenote color but brighten on hover. [^14] The goal is legibility without competing with the main argument.

[^12]: `app/globals.css` — `.thesis-panel-heading`, `.thesis-panel-body`.
[^13]: `.thesis-footnotes li::before { counter-increment: thesis-fn; }`
[^14]: Dark mode uses `#a3a3a3` for sidenote text — see `.dark .thesis-footnotes`.

## 06: Content Authoring Tips

Write one claim per paragraph, then attach sources sparingly. Too many inline markers break reading flow. [^15] Two or three footnotes per section is usually enough; this demo deliberately uses more so you can stress-test the layout.

Put all definitions for a section at the end of that section, after the body paragraphs. [^16] Blank lines between body and definitions are fine — the parser skips footnote lines and joins the rest as body.

Section headings can include numbers, colons, or plain text. [^17] They become `<h3>` elements inside each panel article.

[^15]: Strunk & White — "Omit needless words" applies to citations too.
[^16]: Mixing footnote definitions into the middle of body text will break parsing.
[^17]: Example: `## 06: Content Authoring Tips` → heading "06: Content Authoring Tips".

## 07: Edge Cases to Verify

Scroll quickly through several sections. Notes should swap without flicker — only one panel active at a time. [^18]

Pause mid-section with multiple paragraphs. The section should stay active until the next section's top crosses the anchor. [^19]

Resize the browser across the desktop breakpoint. Split layout should collapse to stacked notes; scroll activation should still work. [^20]

Try keyboard tab through footnote links in the active section. Inactive sections' notes should not receive focus.

[^18]: If two panels appear active, check for duplicate scroll listeners (Strict Mode double-mount is handled by cleanup).
[^19]: Long sections like this one should remain stable — you are reading it now.
[^20]: Breakpoint behavior lives in CSS media queries on `.thesis-panel-inner--split`.

## 08: Historical Context

Margin notes predate the web by centuries. Medieval manuscripts placed glosses in wide margins for commentary. [^21] Early hypertext systems (HyperCard, Eastgate) experimented with collapsible annotations.

The web's `<sup>` + `<a href="#fn">` pattern won for simplicity but sacrificed proximity. [^22] CSS Grid revived the sidenote without tables or JavaScript layout engines.

Modern "digital gardens" and indie publishing often mix short notes with long essays — sidenotes fit that tone. [^23]

[^21]: Illich, *In the Vineyard of the Text* — marginalia culture.
[^22]: HTML 4 footnote patterns — bottom-of-page `<ol>` with back-links.
[^23]: Maggie Appleton — [digital gardening](https://maggieappleton.com/garden-history).

## 09: Performance Notes

Scroll handlers use `{ passive: true }` so the browser need not wait for JavaScript before painting. [^24] The handler only toggles classes and ARIA attributes — no layout reads beyond `getBoundingClientRect`.

Panel count for this demo is intentionally high to verify that O(n) scanning on scroll remains smooth. [^25] For very long essays (50+ sections), consider Intersection Observer with a root margin instead.

Markdown parsing runs once at build/request time on the server, not on scroll. [^26] Client bundle only ships the panel renderer and scroll logic.

[^24]: MDN — [passive event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#passive).
[^25]: Profile with DevTools Performance tab if jank appears — unlikely below ~30 panels.
[^26]: Copy `examples/footnotes-demo/page.tsx` to `app/essays/your-slug/page.tsx` and point `readFileSync` at your panel markdown.

## 10: Accessibility Checklist

Each footnote list has `aria-label="Footnotes for this section"`. [^27] Screen reader users hear which section's notes are exposed when a panel becomes active.

Hidden notes use both `aria-hidden="true"` and `inert` where supported. [^28] Redundant but covers older browsers.

Ensure link text in footnotes is descriptive — "report" and "survey" are acceptable when the surrounding sentence names the source. [^29] Avoid "click here" in sidenotes.

[^27]: `components/panel-markdown.tsx` — `FootnoteList` wrapper.
[^28]: `inert` is Baseline 2023; aria-hidden is the fallback.
[^29]: WCAG 2.4.4 — Link Purpose (In Context).

## 11: Publishing Workflow

Copy `examples/footnotes-demo/panel.md` to `content/panels/your-slug.md` and edit. [^30] Copy `page.tsx` from the same example folder to `app/essays/your-slug/page.tsx`.

Add a row to `app/page.mdx` when you want the post on the home grid. [^31]

For essays without sidenotes, keep using `.mdx` directly — panels are optional, not mandatory. [^32]

[^30]: Frontmatter is parsed by `parsePanelPost` — YAML between `---` delimiters.
[^31]: Home grid uses the same date/category layout as other posts.
[^32]: Panels suit citation-heavy writing; narrative pieces may not need them.

## 12: Stress Test Section

This section exists purely to add scroll length. Lorem-style filler with real footnotes so you can verify numbering resets per section. [^33]

Paragraph two: the sidenote column should scroll with you only in the sense that content swaps — notes are not position-sticky to the viewport, they belong to the panel. [^34]

Paragraph three: keep scrolling. Section 13 comes next with a single footnote. Section 14 has none — panels without footnotes should render without the split layout. [^35]

Paragraph four: if you have read this far, the demo is working well enough for real essays. File issues if activation feels early or late relative to your reading position. [^36]

[^33]: Section-local numbering restarts at 1 for each panel.
[^34]: Sticky behavior, if any, is on the stage container — check CSS if tweaking.
[^35]: Empty footnote arrays skip `.thesis-panel-inner--split`.
[^36]: Anchor tuning constants live at the top of `pickActive` — adjust `80 + vh * 0.07` as needed.

## 13: Almost Done

One more section with a single reference before a footnote-free closer. [^37]

The footnote-free section tests that mixed panel types (with and without notes) layout correctly in sequence.

[^37]: Last numbered footnote in this demo — section 14 intentionally has zero.

## 14: No Footnotes Here

This panel has no sidenotes. It should render as a single column without the notes gutter.

Use sections like this for transitions, summaries, or calls to action that do not need citations.

Scroll back up and down a few times to confirm activation, numbering, and focus behavior across all fourteen sections. That is the whole point of this page.
