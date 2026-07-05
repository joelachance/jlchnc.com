# Panel post with sidenotes

Reference for essays that use scroll-activated sections and margin footnotes.

## Files

- `panel.md` — post content (frontmatter + `##` sections + `[^id]` footnotes)
- `page.tsx` — Next.js route to copy into `app/essays/your-slug/page.tsx`

## Publish a new panel post

1. Copy `panel.md` to `content/panels/your-slug.md` and edit.
2. Copy `page.tsx` to `app/essays/your-slug/page.tsx`.
3. Update the `readFileSync` path and `metadata.title` in the page.
4. Add a row to `app/page.mdx` when you want it on the home grid.

## Markdown format

Each `##` heading starts a panel section. Put footnote definitions at the end of the section:

```markdown
## 01: Section title

Body text with an inline reference. [^1]

[^1]: Source — [link](https://example.com)
```

Sections without footnotes render as a single column (no sidenote gutter).

## Related code

- `lib/panels.ts` — parsing
- `components/post-panels.tsx` — scroll activation + layout
- `components/panel-markdown.tsx` — body + footnote rendering
