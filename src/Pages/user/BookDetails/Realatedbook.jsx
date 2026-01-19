import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function RelatedBooks() {
  const books = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      image:
        "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    },
    {
      title: "Ikigai",
      author: "Héctor García",
      image:
        "https://m.media-amazon.com/images/I/71tbalAHYCL.jpg",
    },
   
   
  ];

  return (
    <div className="mt-20">
      <h2 className="text-xl font-semibold text-center mb-8">
        Related Books
      </h2>

      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          768: { slidesPerView: 4 },
        }}
        modules={[Autoplay]}
      >
        {books.map((book, i) => (
          <SwiperSlide key={i}>
            <div className="text-center">
              <img
                src={book.image}
                className="w-[140px] mx-auto shadow-md"
              />
              <h4 className="mt-3 text-sm font-medium">
                {book.title}
              </h4>
              <p className="text-xs text-gray-500">{book.author}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
