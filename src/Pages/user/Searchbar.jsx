import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search } from "lucide-react";
import API from "../../config/api";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  /* 🔹 Fetch books once */
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/api/books");

        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else if (Array.isArray(res.data.data)) {
          setBooks(res.data.data);
        } else {
          setBooks([]);
        }
      } catch (error) {
        console.error("Search fetch error:", error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  /* 🔹 Filter books (starts with) */
  const filteredBooks = books.filter((book) => {
    const name = book.title || book.name || book.bookTitle;
    return name?.toLowerCase().startsWith(query.toLowerCase());
  });

  return (
    <div className="relative w-full">
      {/* SEARCH INPUT */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            if (filteredBooks.length > 0) {
              navigate(`/book/${filteredBooks[0]._id}`);
              setQuery("");
            }
          }
        }}
        placeholder="Search books…"
        className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 text-sm focus:ring-2 focus:ring-[#99ca3b] outline-none"
      />

      <Search className="absolute right-4 top-2.5 text-gray-500" />

      {/* SEARCH RESULTS / NOT FOUND */}
      {query && (
        <div className="absolute top-11 left-0 w-full bg-white shadow-lg rounded-lg z-50 max-h-64 overflow-y-auto">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => {
              const name = book.title || book.name || book.bookTitle;

              return (
                <div
                  key={book._id}
                  onClick={() => {
                    navigate(`/book/${book._id}`);
                    setQuery("");
                  }}
                  className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                >
                  {name}
                </div>
              );
            })
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
               No books found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
