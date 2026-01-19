import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#f1f3f6] font-[Inter]">

      {/* ================= HEADER ================= */}
      <div className="bg-white border-b">
        <div className="px-[8%] py-12">
          <h1 className="text-3xl font-semibold text-[#fb770c]">
            Contact Us
          </h1>
          <p className="text-sm text-gray-600 mt-2 max-w-xl">
            Have questions about books, orders, or deliveries?  
            Our team is always ready to help you.
          </p>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-[8%] py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= LEFT INFO ================= */}
        <div className="space-y-6">

          {/* Email */}
          <div
            className="
              bg-white rounded-2xl
              border border-indigo-100
              shadow-md hover:shadow-xl
              p-6 flex gap-4 items-start
              transition-all
            "
          >
            <div className="p-3 bg-indigo-50 rounded-full">
              <Mail className="text-indigo-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Email Support
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                support@yourbookstore.com
              </p>
            </div>
          </div>

          {/* Phone */}
          <div
            className="
              bg-white rounded-2xl
              border border-green-100
              shadow-md hover:shadow-xl
              p-6 flex gap-4 items-start
              transition-all
            "
          >
            <div className="p-3 bg-green-50 rounded-full">
              <Phone className="text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Phone Support
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                +91 98765 43210
              </p>
              <p className="text-xs text-gray-500">
                Mon – Sat, 9AM – 6PM
              </p>
            </div>
          </div>

          {/* Address */}
          <div
            className="
              bg-white rounded-2xl
              border border-orange-100
              shadow-md hover:shadow-xl
              p-6 flex gap-4 items-start
              transition-all
            "
          >
            <div className="p-3 bg-orange-50 rounded-full">
              <MapPin className="text-[#fb770c]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Office Address
              </h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Your Book Store Pvt Ltd <br />
                Malappuram, Kerala <br />
                India – 676XXX
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT FORM ================= */}
        <div className="lg:col-span-2">
          <div
            className="
              bg-white rounded-2xl
              border border-orange-100
              shadow-lg
              p-8
            "
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              Send us a message
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              We usually respond within 24 hours
            </p>

            <form className="space-y-5">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="
                    w-full px-4 py-3
                    border rounded-lg
                    text-sm
                    focus:outline-none
                    focus:ring-2 focus:ring-[#fb770c]
                  "
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  className="
                    w-full px-4 py-3
                    border rounded-lg
                    text-sm
                    focus:outline-none
                    focus:ring-2 focus:ring-[#fb770c]
                  "
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                className="
                  w-full px-4 py-3
                  border rounded-lg
                  text-sm
                  focus:outline-none
                  focus:ring-2 focus:ring-[#fb770c]
                "
              />

              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="
                  w-full px-4 py-3
                  border rounded-lg
                  text-sm resize-none
                  focus:outline-none
                  focus:ring-2 focus:ring-[#fb770c]
                "
              />

              <button
                type="submit"
                className="
                  px-12 py-3
                  bg-[#fb770c]
                  text-white
                  text-sm font-medium
                  rounded-full
                  shadow-md
                  hover:bg-[#e96a00]
                  hover:shadow-lg
                  active:scale-95
                  transition-all
                "
              >
                Send Message
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
