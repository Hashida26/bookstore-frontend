import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function ReviewSection({ bookId }) {
  const [rating, setRating] = useState(0);

  return (
    <div className="mt-20 max-w-[720px] mx-auto font-[Inter]">

      <h2 className="text-xl font-medium mb-6 text-center text-gray-900">
        Write a Review
      </h2>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">

        {/* RATING */}
        <div className="flex gap-2 mb-4 justify-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={22}
              onClick={() => setRating(i)}
              className={`
                cursor-pointer transition
                ${i <= rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-400 hover:text-yellow-500"}
              `}
            />
          ))}
        </div>

        {/* REVIEW INPUT */}
        <textarea
          placeholder="Share your thoughts about this book..."
          className="
            w-full h-32
            border border-gray-300
            px-4 py-3
            text-sm
            rounded-md
            outline-none
            focus:ring-2 focus:ring-orange-400
            resize-none
          "
        />

        {/* SUBMIT */}
        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="
              inline-block
              px-8 py-3
              bg-[#fb770c]
              text-white
              text-sm
              font-medium
              rounded-full
              shadow-md
              hover:bg-[#e96a00]
              hover:shadow-lg
              active:scale-95
              transition-all
            "
          >
            Submit Review
          </Link>
        </div>

      </div>
    </div>
  );
}
