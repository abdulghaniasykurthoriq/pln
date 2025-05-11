import { CiFileOn } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation(); // Mendapatkan lokasi saat ini

  return (
    <aside
      className="w-16 flex flex-col items-center py-4 relative z-10"
      style={{
        boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Home Button */}
      <Link to="/">
        <button className="mb-2">
          <div
            className={`w-[42px] h-[42px] flex items-center justify-center rounded-[8px] cursor-pointer ${
              location.pathname === "/"
                ? "bg-cyan-700 hover:bg-cyan-500 text-white"
                : "bg-transparent text-indigo-600"
            } transition duration-300 ease-in-out`}
          >
            <CiHome className="text-bold text-xl" />
          </div>
        </button>
      </Link>

      {/* Create Button */}
      <Link to="/booking-room">
        <button>
          <div
            className={`w-[42px] h-[42px] flex items-center justify-center rounded-[8px] cursor-pointer ${
              location.pathname === "/create" ||
              location.pathname === "/booking-room"
                ? "bg-cyan-700 hover:bg-cyan-500 text-white"
                : "bg-transparent text-indigo-600"
            } transition duration-300 ease-in-out`}
          >
            <CiFileOn className="text-lg" />
          </div>
        </button>
      </Link>
    </aside>
  );
}

export default Sidebar;
