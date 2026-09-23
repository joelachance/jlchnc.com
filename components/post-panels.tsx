import type { PostSection } from '@/lib/panels';
import { AnnotatedMarkdown, PanelMarkdown } from '@/components/panel-markdown';

type PostPanelsProps = {
  sections: PostSection[];
};

export function PostPanels({ sections }: PostPanelsProps) {
  return (
    <section className="thesis-section" aria-label="Post">
      <div className="thesis-stage">
        <div className="thesis-panels">
          {sections.map((section, i) => {
            const hasFootnotes = section.footnotes.length > 0;

            return (
              <article key={i} className="thesis-panel">
                <div
                  className={
                    hasFootnotes
                      ? 'thesis-panel-inner thesis-panel-inner--annotated'
                      : 'thesis-panel-inner'
                  }
                >
                  {section.heading && (
                    <h3 className="thesis-panel-heading">{section.heading}</h3>
                  )}
                  <div className="thesis-panel-body">
                    {hasFootnotes ? (
                      <AnnotatedMarkdown
                        content={section.body}
                        footnotes={section.footnotes}
                      />
                    ) : (
                      <PanelMarkdown content={section.body} />
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
