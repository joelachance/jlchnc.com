const PHRASES = [
  "Shipping since the 80's",
  "Still compiling, still shipping",
  "Production is a social construct",
  "It worked on my machine™",
  "Ship first, ask questions never",
] as const;

export function Tagline() {
  const phrase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
  return <div style={{ fontSize: '12px' }}>{phrase}</div>;
}
