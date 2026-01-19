import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="w-full bg-black text-gray-600 "
      style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
    >
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* ABOUT */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase text-[#99ca3b]">PENTIP</h3>
          <p className="text-lg leading-relaxed text-gray-500">
            PENTIP is one of India’s leading publishers, bringing timeless
            literature, contemporary voices, and meaningful stories to readers
            across generations.
          </p>
        </div>  

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase text-[#99ca3b]">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/books" className="hover:text-white">Books</Link></li>
            <li><Link to="/categories" className="hover:text-white">Categories</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase text-[#99ca3b]">Customer Service</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white">Shipping & Delivery</li>
            <li className="hover:text-white">Returns & Refunds</li>
            <li className="hover:text-white">Privacy Policy</li>
            <li className="hover:text-white">Terms & Conditions</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg font-bold mb-4 uppercase text-[#99ca3b]">Contact</h3>
          <p className="text-sm hover:text-white">📞 +91 484 123 4567</p>
          <p className="text-sm mt-1  hover:text-white">📧 support@dcbooks.com</p>
          <p className="text-sm mt-2  hover:text-white">
            Kottayam, Kerala, India
          </p>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-black/30"></div>

      {/* BOTTOM BAR */}
      <div className="text-center py-4 text-sm text-black/80">
        © {new Date().getFullYear()} DC Books. All Rights Reserved.
      </div>
    </footer>
  );
}
