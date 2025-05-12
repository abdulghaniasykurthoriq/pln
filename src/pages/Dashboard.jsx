import { useEffect, useState } from "react";
import DashboardSummaryCard from "../components/DashboardSummaryCard";
import { AiOutlineDown } from "react-icons/ai";
import icon_listrik from "../assets/icon_listrik.png";

const mockData = [
  {
    unit: "UNIT INDUK 1",
    rooms: [
      {
        title: "Nama Ruangan 1",
        percentage: 86.34,
        amount: 35000000,
        snacks: [
          { name: "Snack Siang", value: 140 },
          { name: "Makan Siang Siang", value: 280 },
          { name: "Snack Sore", value: 140 },
        ],
      },
      // tambahkan ruangan 2, 3...
    ],
  },
  // UNIT INDUK 2, 3, 4...
];

const Dashboard = () => {
  const [data, setData] = useState([]); // State untuk menyimpan data dari API
  const [selectPeriode, setSelectPeriode] = useState(""); // State untuk status loading

  const bulanMap = {
    Jan: "Januari",
    Feb: "Februari",
    Mar: "Maret",
    Apr: "April",
    May: "Mei",
    Jun: "Juni",
    Jul: "Juli",
    Aug: "Agustus",
    Sep: "September",
    Oct: "Oktober",
    Nov: "November",
    Dec: "Desember",
  };

  function formatPeriode(periode) {
    if (!periode) return "";
    const [bulan, tahun] = periode.split("-");
    return `${bulanMap[bulan] || bulan} ${tahun}`;
  }

  const handlePeriodeChange = (e) => {
    setSelectPeriode(e.target.value);
    console.log(e.target.value); // Log nilai yang dipilih
  };

  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/summaryBookings"
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="p-4 space-y-6">
      <div className="w-full max-w-[268px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Periode
        </label>
        <div className="relative w-full">
          <select
            defaultValue={selectPeriode}
            onChange={handlePeriodeChange}
            className="w-full h-[48px] pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none"
          >
            <option disabled value="">
              Pilih Periode
            </option>
            {data.map((item) => (
              <option key={item.id} value={item.period}>
                {formatPeriode(item.period)}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-0 h-full flex items-center">
            <AiOutlineDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        {(() => {
          // Ambil semua room dari periode terpilih
          const rooms = data
            .filter((unit) => unit.period === selectPeriode)
            .flatMap((unit) => (Array.isArray(unit.data) ? unit.data : []));

          // Group by officeName
          const grouped = rooms.reduce((acc, room) => {
            const key = room.officeName || "Unknown Office";
            if (!acc[key]) acc[key] = [];
            acc[key].push(room);
            return acc;
          }, {});

          // Render hasil group
          return Object.entries(grouped).map(([officeName, rooms], i) => (
            <div key={officeName + i} className="m-2">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <img src={icon_listrik} alt="icon" />
                {officeName}
              </h2>
              <div className="flex flex-wrap gap-4">
                {rooms.map((room, j) => (
                  <div key={j} className="w-full max-w-[268px]">
                    <DashboardSummaryCard {...room} />
                  </div>
                ))}
              </div>
            </div>
          ));
        })()}
      </div>
    </div>
  );
};

export default Dashboard;
