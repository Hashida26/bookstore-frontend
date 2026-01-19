import { useState } from "react";
import Swal from "sweetalert2";

/* =======================
   PROFILE COMPONENT
======================= */
export default function Profile() {

  /* =======================
     PROFILE STATE
  ======================= */
  const [profile, setProfile] = useState({
    username: "Hashida Haris K",
    email: "hashida@gmail.com",
    phone: "",
    whatsapp: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [formData, setFormData] = useState(profile);
  const [errors, setErrors] = useState({});

  /* =======================
     HANDLERS
  ======================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.username.trim())
      newErrors.username = "Username is required";

    if (!formData.email.includes("@"))
      newErrors.email = "Enter valid email";

    if (formData.phone && formData.phone.length < 10)
      newErrors.phone = "Enter valid phone number";

    if (formData.pincode && formData.pincode.length !== 6)
      newErrors.pincode = "Pincode must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setProfile(formData);

    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Your profile has been updated successfully",
      confirmButtonColor: "#15803d",
    });
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">

      {/* ================= INSTAGRAM STYLE PROFILE CARD ================= */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

        {/* COVER */}
        <div className="h-28 bg-gradient-to-r from-green-700 to-green-500"></div>

        {/* CONTENT */}
        <div className="px-6 pb-6">

          {/* AVATAR */}
          <div className="-mt-12 flex justify-center sm:justify-start">
            <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-3xl font-semibold text-green-700">
              {profile.username.charAt(0)}
            </div>
          </div>

          {/* NAME & EMAIL */}
          <div className="mt-3 text-center sm:text-left">
            <h3 className="text-[16px] font-semibold text-gray-800">
              {profile.username}
            </h3>
            <p className="text-[13px] text-gray-500">
              {profile.email}
            </p>
          </div>

          {/* STATS */}
          <div className="mt-5 flex justify-center sm:justify-start gap-6 text-[13px]">
            <Stat label="Phone" value={profile.phone || "—"} />
            <Stat label="WhatsApp" value={profile.whatsapp || "—"} />
            <Stat label="Pin" value={profile.pincode || "—"} />
          </div>

          {/* ADDRESS */}
          {profile.address && (
            <div className="mt-4 text-[13px] text-gray-600 flex items-start gap-2 max-w-xl">
              <span>📍</span>
              <p>
                {profile.address}, {profile.city}, {profile.state}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ================= EDIT FORM ================= */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden">

        <div className="bg-[#48882E] text-white px-6 py-3">
          <h2 className="text-[14px] font-semibold">Edit Profile</h2>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleSubmit}>

          <div className="grid md:grid-cols-2 gap-6">
            <Field
              label="Username"
              name="username"
              value={formData.username}
              error={errors.username}
              onChange={handleChange}
            />
            <Field
              label="Phone"
              name="phone"
              value={formData.phone}
              error={errors.phone}
              onChange={handleChange}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Field
              label="WhatsApp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
            />
            <Field
              label="Email"
              name="email"
              value={formData.email}
              error={errors.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-gray-600 mb-1">
              Address
            </label>
            <textarea
              rows="3"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 text-[13px] rounded-sm focus:ring-1 focus:ring-green-700"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Field label="City" name="city" value={formData.city} onChange={handleChange} />
            <Field label="State" name="state" value={formData.state} onChange={handleChange} />
            <Field
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              error={errors.pincode}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="px-8 py-2 bg-[#48882E] text-white text-[13px] rounded-sm hover:bg-gray-800 transition"
          >
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}

/* =======================
   SMALL COMPONENTS
======================= */

const Stat = ({ label, value }) => (
  <div className="text-center">
    <p className="font-semibold text-gray-800">{value}</p>
    <p className="text-gray-500 text-[12px]">{label}</p>
  </div>
);

const Field = ({ label, name, value, error, onChange }) => (
  <div>
    <label className="block text-[12px] font-medium text-gray-600 mb-1">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 px-3 py-2 text-[13px] rounded-sm focus:ring-1 focus:ring-green-700"
    />
    {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
  </div>
);
