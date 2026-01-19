import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as Yup from "yup";
import API from "../../../config/api";

/* ================= VALIDATION ================= */
const ValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  description: Yup.string().min(10).required("Description is required"),
  price: Yup.number().min(1).required("Price is required"),
  category: Yup.string().required("Category is required"),
  stock: Yup.number().min(0).required("Stock is required"),
  pages: Yup.number().min(1).required("Pages is required"),
});

export default function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    category: "",
    publisher: "",
    publishYear: "",
    stock: 1,
    pages: "",
    language: "English",
  });

  /* ================= FETCH BOOK (EDIT) ================= */
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    API.get(`/api/books/${id}`)
      .then((res) => {
        const book = res.data.data;
        setInitialValues(book);
        setPreview(book.image);
      })
      .catch(() => showToast("Failed to load book", "error"))
      .finally(() => setLoading(false));
  }, [id]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value);
      });

      if (!id && !image) {
        return showToast("Image is required", "error");
      }

      if (image) {
        formData.append("image", image);
      }

      if (id) {
        await API.put(`/api/books/${id}`, formData);
        showToast("Book updated successfully");
      } else {
        await API.post("/api/books", formData);
        showToast("Book added successfully");
      }

      navigate("/admin");
    } catch {
      showToast("Something went wrong", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="px-8 py-6 bg-gradient-to-r from-emerald-600 to-green-700">
          <h2 className="text-white text-lg font-semibold">
            {id ? "Edit Book" : "Add New Book"}
          </h2>
          <p className="text-emerald-100 text-sm">
            Manage your book inventory
          </p>
        </div>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="px-8 py-8 space-y-6 text-sm">

              {/* IMAGE */}
              <div className="flex items-center gap-6">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-28 h-40 object-cover rounded-xl shadow-lg border"
                  />
                )}

                <label className="flex flex-col gap-2 cursor-pointer text-gray-600">
                  <span className="font-medium">
                    Book Image {id ? "(optional)" : "*"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="file:mr-4 file:py-2 file:px-4
                               file:rounded-lg file:border-0
                               file:text-sm file:font-semibold
                               file:bg-emerald-50 file:text-emerald-700
                               hover:file:bg-emerald-100"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImage(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              </div>

              {/* FORM GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input label="Book Title" name="title" />
                <Input label="Author" name="author" />
                <Input label="Price" name="price" type="number" />
                <Input label="Stock" name="stock" type="number" />
                <Input label="Pages" name="pages" type="number" />
                <Input label="Publisher" name="publisher" />
                <Input label="Language" name="language" />
                <CategorySelect />
              </div>

              <TextArea label="Description" name="description" />

              {/* ACTIONS */}
              <div className="flex justify-end gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  className="px-6 py-2 rounded-xl border border-gray-300
                             text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl
                             bg-gradient-to-r from-emerald-600 to-green-700
                             text-white font-semibold
                             hover:scale-[1.03] hover:shadow-lg
                             transition-all duration-300"
                >
                  {id ? "Update Book" : "Add Book"}
                </button>
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

/* ================= REUSABLE COMPONENTS ================= */

function Input({ label, name, type = "text" }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600 font-medium">{label}</label>
      <Field
        name={name}
        type={type}
        className="rounded-xl border border-gray-300 px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-emerald-500
                   bg-white/80"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
}

function TextArea({ label, name }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600 font-medium">{label}</label>
      <Field
        as="textarea"
        name={name}
        rows="4"
        className="rounded-xl border border-gray-300 px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-emerald-500
                   bg-white/80"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
}

function CategorySelect() {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-gray-600 font-medium">Category</label>
      <Field
        as="select"
        name="category"
        className="rounded-xl border border-gray-300 px-4 py-2
                   focus:outline-none focus:ring-2 focus:ring-emerald-500
                   bg-white/80"
      >
        <option value="">Select category</option>
        {[
          "fiction",
          "non-fiction",
          "self-help",
          "education",
          "children",
          "history",
          "romance",
          "biography",
          "fantasy",
          "science",
        ].map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Field>
      <ErrorMessage
        name="category"
        component="div"
        className="text-red-500 text-xs"
      />
    </div>
  );
}

/* ================= TOAST ================= */
function showToast(title, icon = "success") {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer: 1800,
  });
}
