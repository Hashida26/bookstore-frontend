import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Pencil, Trash2, Plus } from "lucide-react";
import Loader from "../../../Loader";
import API from "../../../config/api";

const IMAGE_BASE_URL = import.meta.env.VITE_API_URL;

export default function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ================= FETCH BOOKS ================= */
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/books");
      setBooks(res.data.data || []);
    } catch {
      Swal.fire("Error", "Failed to load books", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Book?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/api/books/${id}`);
        Swal.fire("Deleted!", "Book removed", "success");
        fetchBooks();
      } catch {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-gray-100 to-gray-200">

      <div className="bg-white/80 backdrop-blur-xl border border-white/40
                      rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-0
                        justify-between items-start md:items-center
                        px-6 py-5 bg-gradient-to-r from-emerald-600 to-green-700">
          <div>
            <h2 className="text-white font-semibold text-base">
              Manage Books
            </h2>
            <p className="text-emerald-100 text-sm">
              Add, edit or remove books
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/books/add")}
            className="flex items-center gap-2
                       bg-white text-emerald-700
                       px-4 py-2 rounded-xl text-sm font-medium
                       shadow hover:scale-[1.03] transition"
          >
            <Plus size={16} />
            Add Book
          </button>
        </div>

        {/* ================= DESKTOP TABLE ================= */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Book</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Stock</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center">
                    <Loader />
                  </td>
                </tr>
              ) : books.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-10 text-center text-gray-500">
                    No books found
                  </td>
                </tr>
              ) : (
                books.map((book) => (
                  <tr
                    key={book._id}
                    className="border-t hover:bg-emerald-50 transition"
                  >
                    <td className="px-6 py-4 flex items-center gap-4">
                      <img
                        src={`${IMAGE_BASE_URL}${book.image}`}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded-lg shadow"
                      />
                      <div>
                        <p className="font-medium">{book.title}</p>
                        <p className="text-xs text-gray-500">
                          {book.author}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 capitalize">
                      {book.category}
                    </td>

                    <td className="px-6 py-4 font-semibold text-emerald-700">
                      ₹{book.price}
                    </td>

                    <td className="px-6 py-4">
                      {book.stock}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <ActionButton
                          color="blue"
                          onClick={() =>
                            navigate(`/admin/books/edit/${book._id}`)
                          }
                        >
                          <Pencil size={16} />
                        </ActionButton>

                        <ActionButton
                          color="red"
                          onClick={() => handleDelete(book._id)}
                        >
                          <Trash2 size={16} />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARDS ================= */}
        <div className="md:hidden p-4 space-y-4">
          {loading ? (
            <Loader />
          ) : books.length === 0 ? (
            <p className="text-center text-gray-500">
              No books found
            </p>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl shadow-md
                           p-4 flex gap-4"
              >
                <img
                  src={`${IMAGE_BASE_URL}${book.image}`}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded-xl shadow"
                />

                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-gray-800">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {book.author}
                  </p>
                  <p className="text-sm capitalize">
                    {book.category}
                  </p>
                  <p className="font-semibold text-emerald-700">
                    ₹{book.price}
                  </p>
                  <p className="text-xs">
                    Stock: {book.stock}
                  </p>

                  <div className="flex gap-3 pt-2">
                    <ActionButton
                      color="blue"
                      onClick={() =>
                        navigate(`/admin/books/edit/${book._id}`)
                      }
                    >
                      <Pencil size={14} />
                    </ActionButton>

                    <ActionButton
                      color="red"
                      onClick={() => handleDelete(book._id)}
                    >
                      <Trash2 size={14} />
                    </ActionButton>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

/* ================= ACTION BUTTON ================= */
function ActionButton({ children, color, ...props }) {
  const styles = {
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-100",
    red: "bg-red-50 text-red-600 hover:bg-red-100",
  };

  return (
    <button
      {...props}
      className={`p-2 rounded-xl transition ${styles[color]}`}
    >
      {children}
    </button>
  );
}
