const PHRASES = [
  "Building mostly harmless software",
  "Making the web a little bit better",
] as const;

export function Tagline() {
  const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
  return <div style={{ fontSize: '12px' }}>{phrase}</div>;
}
