/**
 * Splits a title into letters tagged with their distance from the middle letter,
 * so a reveal can grow outward from the axis and stay symmetric at every frame.
 */
export default function SplitCaps({ text }: { text: string }) {
  const letters = Array.from(text).filter((ch) => ch !== " ");
  const mid = (letters.length - 1) / 2;
  let index = 0;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.split(/(\s+)/).map((word, w) =>
          /^\s+$/.test(word) ? (
            " "
          ) : (
            <span key={w} className="inline-block whitespace-nowrap">
              {Array.from(word).map((ch) => {
                const dist = Math.round(Math.abs(index++ - mid));
                return (
                  <span key={index} data-char data-dist={dist} className="inline-block will-change-transform">
                    {ch}
                  </span>
                );
              })}
            </span>
          ),
        )}
      </span>
    </>
  );
}
