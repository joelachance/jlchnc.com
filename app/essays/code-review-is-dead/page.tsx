import fs from 'fs';
import path from 'path';
import { PostPanels } from '@/components/post-panels';
import { parsePanelPost } from '@/lib/panels';

export const metadata = {
  title: 'Code Review is Dead'
};

export default function CodeReviewIsDeadPage() {
  const raw = fs.readFileSync(
    path.join(process.cwd(), 'content/panels/code-review-is-dead.md'),
    'utf8'
  );
  const post = parsePanelPost(raw);

  return (
    <>
      <h1 className="font-medium mb-0">{post.title}</h1>
      <div className="home-grid-date mb-6">{post.date}</div>
      <PostPanels sections={post.sections} />
    </>
  );
}
