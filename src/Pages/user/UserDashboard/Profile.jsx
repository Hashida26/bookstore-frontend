import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Profile() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});

  /* ================= LOAD USER ================= */
  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    try {
      setFormData(JSON.parse(storedUser));
    } catch (err) {
      console.error("Invalid JSON:", err);
    }
  }
}, []);
  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= VALIDATION ================= */
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

  /* ================= SAVE ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    // ✅ Save updated data
    localStorage.setItem("user", JSON.stringify(formData));

    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Saved successfully",
      confirmButtonColor: "#15803d",
    });
  };

  /* ================= UI ================= */
  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <div className="h-28 bg-gradient-to-r from-green-700 to-green-500"></div>

        <div className="px-6 pb-6">

          <div className="-mt-12 flex">
            <div className="w-24 h-24 rounded-full bg-white border-4 flex items-center justify-center text-3xl font-semibold text-green-700">
              {formData.username?.charAt(0) || "U"}
            </div>
          </div>

          <div className="mt-3">
            <h3 className="font-semibold text-gray-800">
              {formData.username || "No Name"}
            </h3>
            <p className="text-gray-500 text-sm">
              {formData.email || "No Email"}
            </p>
          </div>

          <div className="mt-5 flex gap-6 text-sm">
            <Stat label="Phone" value={formData.phone || "—"} />
            <Stat label="WhatsApp" value={formData.whatsapp || "—"} />
            <Stat label="Pin" value={formData.pincode || "—"} />
          </div>

          {formData.address && (
            <div className="mt-4 text-sm text-gray-600 flex gap-2">
              <span>📍</span>
              <p>
                {formData.address}, {formData.city}, {formData.state}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FORM */}
      <div className="bg-gray-50 border rounded-2xl">

        <div className="bg-[#48882E] text-white px-6 py-3">
          Edit Profile
        </div>

        <form className="p-6 space-y-6" onSubmit={handleSubmit}>

          <div className="grid md:grid-cols-2 gap-6">
            <Field name="username" value={formData.username} error={errors.username} onChange={handleChange} label="Username" />
            <Field name="phone" value={formData.phone} error={errors.phone} onChange={handleChange} label="Phone" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Field name="whatsapp" value={formData.whatsapp} onChange={handleChange} label="WhatsApp" />
            <Field name="email" value={formData.email} error={errors.email} onChange={handleChange} label="Email" />
          </div>

          <textarea
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="Address"
            className="w-full border px-3 py-2 text-sm"
          />

          <div className="grid md:grid-cols-3 gap-6">
            <Field name="city" value={formData.city} onChange={handleChange} label="City" />
            <Field name="state" value={formData.state} onChange={handleChange} label="State" />
            <Field name="pincode" value={formData.pincode} error={errors.pincode} onChange={handleChange} label="Pincode" />
          </div>

          <button className="px-6 py-2 bg-green-700 text-white">
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}

/* COMPONENTS */

const Stat = ({ label, value }) => (
  <div>
    <p className="font-semibold">{value}</p>
    <p className="text-gray-500 text-xs">{label}</p>
  </div>
);

const Field = ({ label, name, value, error, onChange }) => (
  <div>
    <label className="text-xs text-gray-600">{label}</label>
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      className="w-full border px-3 py-2 text-sm"
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);