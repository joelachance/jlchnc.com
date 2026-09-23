import type { ReactNode } from 'react';
import type { Footnote } from '@/lib/panels';

type PanelMarkdownProps = {
  content: string;
  footnotes?: Footnote[];
};

function replaceFootnoteRefs(content: string, footnotes: Footnote[]): string {
  if (!footnotes.length) return content;

  const idToIndex = new Map(footnotes.map((fn) => [fn.id, fn.index]));
  return content.replace(/\[\^([^\]]+)\]/g, (_, id: string) => {
    const index = idToIndex.get(id);
    return index ? `{{fn:${index}}}` : `[^${id}]`;
  });
}

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\{\{fn:(\d+)\}\}|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1].startsWith('{{fn:')) {
      nodes.push(
        <sup key={`${match.index}-fn`} className="thesis-fn-ref">
          {match[2]}
        </sup>
      );
    } else {
      const href = match[4];
      nodes.push(
        <a
          key={`${match.index}-link`}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        >
          {match[3]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function splitParagraphs(content: string): string[] {
  return content.split(/\n\n+/).filter(Boolean);
}

export function PanelMarkdown({ content, footnotes = [] }: PanelMarkdownProps) {
  const paragraphs = splitParagraphs(replaceFootnoteRefs(content, footnotes));

  return (
    <>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{renderInline(paragraph.replace(/\n/g, ' '))}</p>
      ))}
    </>
  );
}

/** Paragraphs with each paragraph's footnotes set beside it. */
export function AnnotatedMarkdown({
  content,
  footnotes
}: {
  content: string;
  footnotes: Footnote[];
}) {
  const paragraphs = splitParagraphs(replaceFootnoteRefs(content, footnotes));

  return (
    <>
      {paragraphs.map((paragraph, index) => {
        const refs = new Set(
          [...paragraph.matchAll(/\{\{fn:(\d+)\}\}/g)].map((m) => Number(m[1]))
        );
        const notes = footnotes.filter((fn) => refs.has(fn.index));

        return (
          <div key={index} className="thesis-para-row">
            <p className="thesis-para-main">
              {renderInline(paragraph.replace(/\n/g, ' '))}
            </p>
            {notes.length > 0 && (
              <aside className="thesis-para-notes" aria-label="Footnotes">
                <ol className="thesis-footnotes">
                  {notes.map((fn) => (
                    <li key={fn.id} data-n={fn.index}>
                      <span className="thesis-fn-text">
                        <PanelMarkdown content={fn.content} />
                      </span>
                    </li>
                  ))}
                </ol>
              </aside>
            )}
          </div>
        );
      })}
    </>
  );
}
