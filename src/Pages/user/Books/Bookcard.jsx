import { Star } from "lucide-react";
import { Link } from "react-router-dom";



export default function BookCard({ book }) {
   
  return (
    
   <div className="group text-center">
  <div className="h-[220px] w-full overflow-hidden bg-gray-100">
    <img
      src={book.image}
      alt={book.title}
      className="w-full h-full object-cover"
    />
  </div>

  <h3 className="mt-3 text-sm font-semibold leading-tight line-clamp-2">
    {book.title}
  </h3>

  <p className="text-xs text-gray-500 mt-1">{book.author}</p>

  <div className="flex justify-center items-center gap-1 mt-2">
    <Star size={14} className="text-yellow-500 fill-yellow-500" />
    <span className="text-xs">{book.rating || 4.5}</span>
  </div>

  <p className="mt-2 text-sm font-semibold">₹{book.price}</p>

  <Link
    to={`/book/${book._id}`}
    className="
      mt-3 block w-full
      border border-black bg-black
      text-white text-xs py-2
      hover:bg-[#e96a00]
      transition
    "
  >
    View Details
  </Link>
</div>
  )}
