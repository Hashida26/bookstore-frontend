export default function AboutSection() {
  return (
    <section className="w-full bg-gray-50 py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          About Us
        </h2>

        {/* underline */}
        <div className="w-16 h-1 bg-red-700 mx-auto mb-6"></div>

        {/* Content */}
        <p className="text-gray-700 text-sm leading-relaxed max-w-3xl mx-auto">
          We are an online bookstore dedicated to bringing readers the best
          collection of books across literature, fiction, self-help and more.
          Inspired by the legacy of DC Books, our goal is to make quality books
          easily accessible to every reader.
        </p>

        <p className="text-gray-700 text-sm leading-relaxed mt-4 max-w-3xl mx-auto">
          From timeless classics to modern bestsellers, we believe books have
          the power to inform, inspire, and transform lives.
        </p>

      </div>
    </section>
  );
}
