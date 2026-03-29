const PHRASES = [
  "Shipping since the 80's",
  "Building mostly harmless software",
  "Third worst engineer in the world",
  "Trying to make the web a little bit better",
] as const;

export function Tagline() {
  const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
  return <div style={{ fontSize: '12px' }}>{phrase}</div>;
}
