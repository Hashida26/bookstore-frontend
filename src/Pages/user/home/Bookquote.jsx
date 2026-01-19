import { useEffect, useState } from "react";

export default function QuoteSection() {
  const quotes = [
    "A reader lives a thousand lives before he dies. — George R.R. Martin",
    "Books are a uniquely portable magic. — Stephen King",
    "There is no friend as loyal as a book. — Ernest Hemingway",
    "Once you learn to read, you will be forever free. — Frederick Douglass",
    "Reading is dreaming with open eyes."
  ];

  const backgrounds = [
    "from-gray-900 via-black to-gray-800",
    "from-green-900 via-black to-green-800",
    "from-zinc-900 via-black to-zinc-800"
  ];

  const [quote, setQuote] = useState("");
  const [bg, setBg] = useState("");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    setBg(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  }, []);

  return (
    <section
      className={`
        w-full
        h-[200px] md:h-80
        flex items-center justify-center
        bg-linear-to-r ${bg}
        text-white
        relative
        overflow-hidden
      `}
    >
      {/* subtle texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]"></div>

      {/* content */}
      <div className="relative z-10 max-w-3xl px-6 text-center animate-quoteFade">
        <p
          className="
            font-['Quicksand']
            text-lg md:text-2xl
            font-medium
            leading-relaxed
            tracking-wide
          "
        >
          “{quote}”
        </p>

        <div className="mt-6 w-16 h-0.5 bg-red-700 mx-auto"></div>
      </div>
    </section>
  );
}
