import { useEffect, useState } from "react";
import FilterSidebar from "./Filtersidebar";
import BookGrid from "./Bookgrid";
import axios from "axios";
import API from "../../../config/api";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [filters, setFilters] = useState({
    language: "",
    category: "",
    minPrice: "",
    maxPrice: ""
  });

  useEffect(() => {
    fetchBooks();
  }, [filters]);

  const fetchBooks = async () => {
    const res = await API.get("/api/books", {
      params: filters
     
      
    });
     console.log(res);
    setBooks(res.data.data);
  };

  return (
    <div className="px-[5%] py-10 flex gap-8">
      
      {/* LEFT FILTER */}
      <FilterSidebar filters={filters} setFilters={setFilters} />

      {/* RIGHT BOOK LIST */}
      <BookGrid books={books} />
    </div>
  );
}
