import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function BookCoverSlider() {
  const books = [
    {
      title: "Atomic Habits",
      image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    },
    {
      title: "The Alchemist",
      image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
    },
    {
      title: "Think Like a Monk",
      image: "https://m.media-amazon.com/images/I/81s6DUyQCZL.jpg",
    },
    {
      title: "Ikigai",
      image: "https://m.media-amazon.com/images/I/81l3rZK4lnL.jpg",
    },
    {
      title: "Rich Dad Poor Dad",
      image: "https://m.media-amazon.com/images/I/81bsw6fnUiL.jpg",
    },
    {
      title: "The Power of Now",
      image: "https://m.media-amazon.com/images/I/71t4GuxLCuL.jpg",
    },
    {
      title: "Deep Work",
      image: "https://m.media-amazon.com/images/I/71g2ednj0JL.jpg",
    },
    {
    title: "Goat Days",
          image: "https://m.media-amazon.com/images/I/81BE0jhVuRL._AC_UF1000,1000_QL80_.jpg",
    },
    {
        title: "Randamoozham",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdpFwArG-YO9uhxPDrON5LdDOfu4gAjnpCEg&s"



    }


  ];

  return (
    <section className="relative w-full py-16 bg-[#f7f5f2] overflow-hidden">

      {/* 🔹 FADE EDGES */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r from-[#f7f5f2] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-[#f7f5f2] to-transparent z-10" />

      {/* 🔹 SLIDER */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={6000}
        loop={true}
        slidesPerView={2.5}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 3.5 },
          768: { slidesPerView: 4.5 },
          1024: { slidesPerView: 6 },
        }}
        className="px-6"
      >
        {books.map((book, index) => (
          <SwiperSlide key={index}>
            <div className="flex justify-center">
              <img
                src={book.image}
                alt={book.title}
                className="
                  h-[260px]
                  w-[170px]
                  object-cover
                  rounded-md
                  shadow-md
                  transition-transform
                  hover:scale-105
                "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
