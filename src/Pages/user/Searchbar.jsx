import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import API from "../../config/api";

/**
 * onSelect (optional):
 * Used by mobile navbar to auto-close search overlay
 */
export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const navigate = useNavigate();

  /* ================= FETCH BOOKS ================= */
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/api/books");

        let fetchedBooks = [];

        if (Array.isArray(res.data)) {
          fetchedBooks = res.data;
        } else if (Array.isArray(res.data?.data)) {
          fetchedBooks = res.data.data;
        }

        setBooks(fetchedBooks);
        setIsFetched(true);
      } catch (error) {
        console.error("Search fetch error:", error);
        setBooks([]);
        setIsFetched(true);
      }
    };

    fetchBooks();
  }, []);

  /* ================= FILTER BOOKS ================= */
  const filteredBooks = books.filter((book) => {
    const name = book.title || book.name || book.bookTitle;
    return name?.toLowerCase().includes(query.toLowerCase());
  });

  /* ================= NAVIGATE & CLOSE ================= */
  const goToBook = (bookId) => {
    navigate(`/book/${bookId}`);
    setQuery("");
    onSelect?.(); // auto-close mobile search if provided
  };

  return (
    <div className="relative w-full z-9999">
      {/* ================= SEARCH INPUT ================= */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && filteredBooks.length > 0) {
            goToBook(filteredBooks[0]._id);
          }
        }}
        placeholder="Search books…"
        className="w-full border border-gray-300 bg-[#f9fafb]
        rounded-full py-2 px-4 pr-10 text-sm
        focus:ring-2 focus:ring-[#99ca3b] outline-none"
      />

      {/* CLEAR (CLOSE) ICON INSIDE INPUT */}
      {query && (
        <button
          onClick={() => {
            setQuery("");
            onSelect?.(); // optional: close mobile overlay
          }}
          className="absolute right-3 top-2 flex items-center justify-center
          w-6 h-6 rounded-full bg-gray-200 text-gray-600
          hover:bg-gray-300 active:bg-gray-400"
        >
          <X size={14} />
        </button>
      )}

      {/* ================= SEARCH RESULTS ================= */}
      {query && (
        <div
          className="absolute top-11 left-0 w-full bg-[#f9fafb]
          shadow-xl rounded-xl z-[9999] max-h-64 overflow-y-auto
          border border-gray-200"
        >
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => {
              const name = book.title || book.name || book.bookTitle;

              return (
                <div
                  key={book._id}
                  onClick={() => goToBook(book._id)}
                  className="px-4 py-3 text-sm cursor-pointer
                  hover:bg-gray-100 active:bg-gray-200"
                >
                  {name}
                </div>
              );
            })
          ) : (
            isFetched && (
              <div className="px-4 py-3 text-sm text-gray-500 text-center">
                No books found
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
