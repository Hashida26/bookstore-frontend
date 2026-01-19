import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Loader from "../../../Loader";
import API from "../../../config/api";

export default function NewReleases() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH BOOKS ================= */
  const fetchBooks = async () => {
    try {
      const res = await API.get("/api/books");
      setBooks(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  /* ================= LOADER ================= */
  if (loading) {
    return <Loader />;
  }

  return (
    <section className="w-full bg-white py-16">

      {/* ===== HEADING ===== */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold tracking-wide text-gray-900">
          Top Books
        </h2>
        <div className="w-16 h-1 bg-red-700 mx-auto mt-3"></div>
      </div>

      {/* ===== BOOK GRID ===== */}
      <div
        className="
          max-w-6xl mx-auto
          grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
          gap-8 px-4 gap-y-20
        "
      >
        {books.map((book) => (
          <div
            key={book._id}
            className="group bg-white flex flex-col items-center text-center"
          >
            {/* BOOK IMAGE */}
            <div className="w-45 h-65 overflow-hidden shadow-md">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition"
              />
            </div>

            {/* TITLE */}
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              {book.title}
            </h3>

            {/* AUTHOR */}
            <p className="text-xs text-gray-500 mt-0.5">
              {book.author}
            </p>

            {/* RATING */}
            <div className="flex items-center gap-1 mt-1 text-xs">
              <Star size={13} className="text-yellow-500 fill-yellow-500" />
              <span className="text-gray-700">
                {book.rating || 4.5}
              </span>
            </div>

            {/* PRICE */}
            <p className="mt-1 text-sm font-semibold text-gray-900">
              ₹{book.price}
            </p>

            {/* VIEW DETAILS */}
            <Link
              to={`/book/${book._id}`}
              className="
                mt-3
                text-sm
                font-medium
                bg-[#99ca3b]
                text-white
                border border-black
                px-4 py-1
                hover:bg-white hover:text-black
                transition
              "
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
