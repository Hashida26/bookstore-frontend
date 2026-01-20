import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import RelatedBooks from "./Realatedbook";
import ReviewSection from "./Review";
import Loader from "../../../Loader";
import API from "../../../config/api";
import { addToCart } from "../../../Redux/Cartslice";
import { useDispatch } from "react-redux";

export default function Singleview() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSticky, setShowSticky] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/api/books/${id}`);
        setBook(res.data.data);
      } catch (error) {
        console.error("Error fetching book", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  /* ================= STICKY CTA ================= */
  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <Loader />;

  if (!book) {
    return (
      <div className="px-[8%] py-24 text-center font-[Inter]">
        Book not found
      </div>
    );
  }

  return (
    <>
      {/* ================= MAIN CONTENT ================= */}
      <div className="px-[8%] py-16 font-[Inter]">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

          {/* LEFT IMAGE */}
          <div className="flex justify-center">
            <img
              src={book.image}


              alt={book.title}
              className="w-[260px] md:w-[320px] object-contain shadow-xl"
            />
          </div>

          {/* RIGHT DETAILS */}
          <div className="space-y-6">

            <h1 className="text-3xl font-medium text-gray-900 tracking-tight">
              {book.title}
            </h1>

            <p className="text-sm text-gray-500">
              by <span className="font-medium text-gray-700">{book.author}</span>
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-gray-700">
                {book.rating} / 5
              </span>
            </div>

            {/* Price */}
            <p className="text-2xl font-semibold text-gray-900">
              ₹{book.price}
            </p>

            {/* Meta */}
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Language:</span> {book.language}</p>
              <p><span className="font-medium">Category:</span> {book.category}</p>
            </div>

            {/* Description */}
            <div className="pt-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                {book.description}
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 pt-6">

              {/* ADD TO CART */}
              <Link to="/cart">
                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: book._id,
                        title: book.title,
                        price: book.price,
                        image: book.image,
                        author: book.author,
                      })
                    )
                  }
                  className="
                    px-10 py-3
                    border border-[#fb770c]
                    text-[#fb770c]
                    bg-white
                    text-sm
                    font-medium
                    rounded-full
                    shadow-sm
                    hover:bg-[#fb770c]
                    hover:text-white
                    hover:shadow-md
                    active:scale-95
                    transition-all
                  "
                >
                  Add to Cart
                </button>
              </Link>

              {/* BUY NOW */}
              <Link to="/login">
                <button
                  className="
                    px-10 py-3
                    bg-[#fb770c]
                    text-white
                    text-sm
                    font-medium
                    rounded-full
                    hover:bg-white
                    hover:text-[#fb770c]
                    hover:shadow-md
                    active:scale-95
                    transition-all
                  "
                >
                  Buy Now
                </button>
              </Link>

            </div>
          </div>
        </div>

        {/* RELATED + REVIEWS */}
        <RelatedBooks category={book.category} />
        <ReviewSection bookId={book._id} />
      </div>

      {/* ================= STICKY PRICE BAR ================= */}
      <div
        className={`
          fixed bottom-0 left-0 w-full bg-white border-t
          px-[8%] py-4
          flex items-center justify-between
          transition-all duration-300
          ${showSticky ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div>
          <p className="text-sm text-gray-500">Price</p>
          <p className="text-lg font-semibold text-gray-900">
            ₹{book.price}
          </p>
        </div>

        <div className="flex gap-3">

          {/* STICKY ADD TO CART */}
          <Link to="/cart">
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: book._id,
                    title: book.title,
                    price: book.price,
                    image: book.image,
                    author: book.author,
                  })
                )
              }
              className="
                px-8 py-3
                border border-[#fb770c]
                text-[#fb770c]
                bg-white
                text-sm
                font-medium
                rounded-full
                shadow-sm
                hover:bg-[#fb770c]
                hover:text-white
                active:scale-95
                transition-all
              "
            >
              Add to Cart
            </button>
          </Link>

          {/* STICKY BUY NOW */}
          <Link to="/login">
            <button
              className="
                px-8 py-3
                bg-[#fb770c]
                text-white
                text-sm
                font-medium
                rounded-full
                hover:bg-white
                hover:text-[#fb770c]
                active:scale-95
                transition-all
              "
            >
              Buy Now
            </button>
          </Link>

        </div>
      </div>
    </>
  );
}
