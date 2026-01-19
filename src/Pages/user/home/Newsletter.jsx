export default function Newsletter() {
  return (
    <section className="
      w-full
      py-16 md:py-20
      bg-linear-to-b from-[#f7f7f7] to-white
      flex justify-center
    ">
      <div className="
        w-[90%] md:w-[70%] lg:w-[55%]
        text-center
        font-[Quicksand]
        animate-fadeUp
      ">

        {/* HEADING */}
        <h2 className="
          text-2xl md:text-3xl
          font-semibold
          text-gray-900
        ">
          Stay Updated With New Reads
        </h2>

        {/* UNDERLINE */}
        <div className="w-16 h-0.5 bg-black mx-auto mt-3"></div>

        {/* SUBTEXT */}
        <p className="
          mt-4
          text-sm md:text-base
          text-gray-600
          leading-relaxed
        ">
          Subscribe to receive updates on new releases, bestsellers,
          author events, and exclusive offers.
        </p>

        {/* FORM */}
        <div className="
          mt-8
          flex flex-col sm:flex-row
          items-center
          justify-center
          gap-4
        ">
          <input
            type="email"
            placeholder="Enter your email address"
            className="
              w-full sm:w-[70%]
              px-5 py-3
              rounded-full
              border border-gray-300
              text-sm
              focus:outline-none
              focus:ring-2 focus:ring-black
            "
          />

          <button
            className="
              px-8 py-3
              rounded-full
              bg-[#99ca3b]
              text-white
              text-sm
              font-medium
              hover:bg-gray-800
              transition
            "
          >
            Subscribe
          </button>
        </div>

        {/* NOTE */}
        <p className="mt-4 text-xs text-gray-500">
          We respect your privacy. Unsubscribe anytime.
        </p>

      </div>
    </section>
  );
}
