export default function Sidebar({ active, setActive }) {
  const links = [
    { key: "profile", label: "Profile" },
    { key: "orders", label: "Orders" },
    { key: "cart", label: "Cart" },
    { key: "signout", label: "Sign Out" },
  ];

  return (
    <div className="w-64 bg-white border-r">

      {/* HEADER – aligned with right card */}
      <div className=" text-black px-6 py-3">
        <h2 className="text-[20px] font-semibold tracking-wide">
          My Account
        </h2>
      </div>

      {/* LINKS */}
      <ul className="py-4 text-sm">
        {links.map((item) => {
          const isActive = active === item.key;

          return (
            <li
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`mx-2 px-4 py-2 rounded-sm cursor-pointer transition
                ${
                  isActive
                    ? "bg-[#48882E] text-white"
                    : "text-gray-700 hover:bg-white hover:text-black"
                }`}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
