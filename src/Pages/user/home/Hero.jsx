import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export default function Hero() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1600&auto=format&fit=crop",
      title: "A Home for Every Reader",
      subtitle: "Discover stories that stay with you forever",
    },
    {
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop",
      title: "Where Books Feel Like Home",
      subtitle: "Carefully curated reads for every mood",
    },
    {
      image:
        "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1600&auto=format&fit=crop",
      title: "Read. Relax. Repeat.",
      subtitle: "A peaceful space for curious minds",
    },
  ];

  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        className="w-full h-[45vh] md:h-[60vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay (DC Books style – soft, readable) */}
              <div className="absolute inset-0 bg-black/45"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="px-[6%] max-w-2xl text-white">
                  <h1 className="text-2xl md:text-4xl font-extrabold leading-tight">
                    {slide.title}
                  </h1>

                  <p className="mt-3 text-sm md:text-lg text-gray-200">
                    {slide.subtitle}
                  </p>

                  <Link to="/books"  className="
    mt-8
    inline-block
    px-8 py-3
    bg-green-600
    hover:bg-green-700
    transition-all
    rounded-full
    text-sm
    font-semibold
    shadow-lg
  ">
                    Explore Books
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
