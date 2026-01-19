import BookCard from "./Bookcard";
import Books from "./Books";

export default function BookGrid({ books }) {
  return (
    <div className="flex-1">
      <div className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        gap-x-6 
        gap-y-10
      ">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
