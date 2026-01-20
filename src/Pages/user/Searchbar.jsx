import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
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
    onSelect?.(); // ✅ auto-close mobile search if provided
  };

  return (
    <div className="relative w-full z-[9999]">
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
        className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10
        text-sm focus:ring-2 focus:ring-[#99ca3b] outline-none"
      />

      <Search className="absolute right-4 top-2.5 text-gray-500" />

      {/* ================= SEARCH RESULTS ================= */}
      {query && (
        <div
          className="absolute top-11 left-0 w-full bg-white shadow-xl
          rounded-lg z-[9999] max-h-64 overflow-y-auto"
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
