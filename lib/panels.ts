export type Footnote = {
  id: string;
  index: number;
  content: string;
};

export type PostSection = {
  heading: string | null;
  body: string;
  footnotes: Footnote[];
};

export type PanelPost = {
  title: string;
  date: string;
  slug: string;
  category: string;
  sections: PostSection[];
};

const FOOTNOTE_DEF = /^\[\^([^\]]+)\]:\s*(.+)$/;

function parseFrontmatter(raw: string): {
  data: Partial<PanelPost>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const data: Partial<PanelPost> = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      if (key === 'title' || key === 'date' || key === 'slug' || key === 'category') {
        data[key] = value;
      }
    }
  }

  return { data, content: match[2] };
}

function parseFootnotes(sectionText: string): {
  body: string;
  footnotes: Footnote[];
} {
  const lines = sectionText.split('\n');
  const bodyLines: string[] = [];
  const footnotes: Footnote[] = [];
  let index = 0;

  for (const line of lines) {
    const match = line.match(FOOTNOTE_DEF);
    if (match) {
      index += 1;
      footnotes.push({
        id: match[1],
        index,
        content: match[2].trim(),
      });
    } else {
      bodyLines.push(line);
    }
  }

  return {
    body: bodyLines.join('\n').trim(),
    footnotes,
  };
}

function parseSections(body: string): PostSection[] {
  const trimmed = body.trim();
  const parts = trimmed.split(/^## /m);

  return parts.map((part, i) => {
    if (i === 0 && !trimmed.startsWith('## ')) {
      const { body: sectionBody, footnotes } = parseFootnotes(part.trim());
      return { heading: null, body: sectionBody, footnotes };
    }

    const newline = part.indexOf('\n');
    const heading = newline === -1 ? part.trim() : part.slice(0, newline).trim();
    const rest = newline === -1 ? '' : part.slice(newline + 1);
    const { body: sectionBody, footnotes } = parseFootnotes(rest);

    return {
      heading: heading || null,
      body: sectionBody,
      footnotes,
    };
  });
}

export function parsePanelPost(raw: string): PanelPost {
  const { data, content } = parseFrontmatter(raw);
  return {
    title: data.title ?? '',
    date: data.date ?? '',
    slug: data.slug ?? '',
    category: data.category ?? 'Writing',
    sections: parseSections(content.trim()),
  };
}
