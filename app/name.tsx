import { GeistPixelLine } from 'geist/font/pixel';

export function Name() {
  return (
    <>
      <h1 className="font-sm pt-12">
        <span className="sr-only">Joe LaChance</span>
        <span
          aria-hidden="true"
          className="block overflow-hidden group relative"
        >
          <span className={`${GeistPixelLine.className} inline-block whitespace-nowrap text-5xl`}>
            {'jlchnc'}
          </span>
        </span>
      </h1>
    </>
  );
}
