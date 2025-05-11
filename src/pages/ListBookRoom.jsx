import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ListBookRoom() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Ruang Meeting</h2>
          <p className="text-sm text-gray-500">Ruang Meeting</p>
        </div>

        <Link to="/create">
          <button className="bg-cyan-700 cursor-pointer hover:bg-cyan-800 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaPlus />
            Pesan Ruangan
          </button>
        </Link>
      </div>

      <div className="text-center mt-10">Belum ada data ruang meeting.</div>
    </>
  );
}
