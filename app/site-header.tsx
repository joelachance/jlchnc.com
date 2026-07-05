import Link from 'next/link';
import { Name } from './name';

const GITHUB = 'https://github.com/joelachance';
const TWITTER = 'https://x.com/jlchnc';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-brand-row">
        <Link href="/" className="site-title-row">
          <Name />
        </Link>
      </div>

      <div className="site-meta">
        <div className="site-social-links">
          <a href={TWITTER} target="_blank" rel="noopener noreferrer">
            twitter
          </a>
          <span className="site-meta-sep" aria-hidden="true">
            ·
          </span>
          <a href={GITHUB} target="_blank" rel="noopener noreferrer">
            github
          </a>
        </div>
        <div className="site-meta-line site-meta-muted">
          © {new Date().getFullYear()}
        </div>
      </div>
    </header>
  );
}
