'use client';

import { useEffect, useRef } from 'react';
import type { PostSection } from '@/lib/panels';
import { FootnoteList, PanelMarkdown } from '@/components/panel-markdown';

type PostPanelsProps = {
  sections: PostSection[];
};

export function PostPanels({ sections }: PostPanelsProps) {
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const anchorYRef = useRef<number | null>(null);

  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLElement[];
    if (!panels.length) return;

    const header = document.querySelector('.site-header');

    const pickActive = () => {
      const vh = window.innerHeight;
      const baseY =
        anchorYRef.current ??
        (header ? header.getBoundingClientRect().height + 64 : 120);
      // Activate near mid-viewport so active sections sit toward center.
      const anchorY = Math.min(baseY + 40 + vh * 0.05, vh * 0.5);

      let active = panels[0];
      for (const panel of panels) {
        if (panel.getBoundingClientRect().top <= anchorY) {
          active = panel;
        }
      }

      // scrollY often stops a few px short of the absolute end
      const remaining =
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight;
      if (remaining <= 32) {
        active = panels[panels.length - 1];
      }

      const sy = window.scrollY;
      if (sy < 24) {
        active = panels[0];
        anchorYRef.current = panels[0].getBoundingClientRect().top;
      }

      panels.forEach((panel) => {
        const isOn = panel === active;
        panel.classList.toggle('thesis-panel--active', isOn);
        const notes = panel.querySelector('.thesis-panel-notes');
        if (notes) {
          if (isOn) notes.removeAttribute('aria-hidden');
          else notes.setAttribute('aria-hidden', 'true');
          if ('inert' in notes) {
            (notes as HTMLElement & { inert: boolean }).inert = !isOn;
          }
        }
      });
    };

    const onScroll = () => pickActive();
    const onResize = () => pickActive();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    pickActive();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [sections]);

  return (
    <section className="thesis-section" aria-label="Post">
      <div className="thesis-stage">
        <div className="thesis-panels">
          {sections.map((section, i) => {
            const hasFootnotes = section.footnotes.length > 0;
            const innerClass = hasFootnotes
              ? 'thesis-panel-inner thesis-panel-inner--split'
              : 'thesis-panel-inner';

            return (
              <article
                key={i}
                className={`thesis-panel${i === 0 ? ' thesis-panel--active' : ''}`}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
              >
                <div className={innerClass}>
                  <div className={hasFootnotes ? 'thesis-panel-main' : undefined}>
                    {section.heading && (
                      <h3 className="thesis-panel-heading">{section.heading}</h3>
                    )}
                    <div className="thesis-panel-body">
                      <PanelMarkdown
                        content={section.body}
                        footnotes={section.footnotes}
                      />
                    </div>
                  </div>
                  {hasFootnotes && (
                    <FootnoteList footnotes={section.footnotes} />
                  )}
                </div>
              </article>
            );
          })}
          <div className="thesis-panels-end" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
