import { GeistPixelLine } from 'geist/font/pixel';

export function Name() {
  return (
    <>
      <h1 className="font-sm">
        <span
          aria-hidden="true"
          className="block overflow-hidden group relative"
        >
          <span
            className={`${GeistPixelLine.className} inline-block whitespace-nowrap text-4xl sm:text-5xl`}
          >
            joe lachance
          </span>
        </span>
      </h1>
    </>
  );
}
