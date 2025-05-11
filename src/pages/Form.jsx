import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineDown } from "react-icons/ai";
import { FiCalendar, FiChevronRight, FiChevronLeft } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id"; // Mengimpor locale Indonesia dari date-fns
import CustomTimePicker from "../components/CustomTimePicker";
import { useLocation } from "react-router-dom";

// Register locale Indonesia
registerLocale("id", id);

export default function Form() {
  const navigate = useNavigate();
  const [unit, setUnit] = useState([]);
  const [meetingRoom, setMeetingRoom] = useState([]);
  const [jenisKonsumsi, setJenisKonsumsi] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [selectedKapasitas, setSelectedKapasitas] = useState(0);
  const [tanggalRapat, setTanggalRapat] = useState(new Date());
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuSelesai, setWaktuSelesai] = useState("");
  const [jumlahPeserta, setJumlahPeserta] = useState(0);
  const [konsumsiState, setKonsumsiState] = useState([]);
  const [totalKonsumsi, setTotalKonsumsi] = useState(0);
  const [errorWaktu, setErrorWaktu] = useState("");

  const fetchUnit = async () => {
    try {
      const response = await fetch(
        "https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterOffice"
      );
      const data = await response.json();
      setUnit(data);
    } catch (error) {
      console.error("Error fetching unit data:", error);
    }
  };

  const fetchMeetingRoom = async () => {
    try {
      const response = await fetch(
        "https://6666c7aea2f8516ff7a4e261.mockapi.io/api/dummy-data/masterMeetingRooms"
      );
      const data = await response.json();
      setMeetingRoom(data);
    } catch (error) {
      console.error("Error fetching meeting room data:", error);
    }
  };

  const fetchJenisKonsumsi = async () => {
    try {
      const response = await fetch(
        "https://6686cb5583c983911b03a7f3.mockapi.io/api/dummy-data/masterJenisKonsumsi"
      );
      const data = await response.json();
      setJenisKonsumsi(data);
    } catch (error) {
      console.error("Error fetching jenis konsumsi data:", error);
    }
  };

  const handleUnitChange = (event) => {
    const selectedUnitId = event.target.value;
    setSelectedUnitId(selectedUnitId);
  };
  const handleRoomChange = (event) => {
    const selectedRoomId = event.target.value;
    setSelectedRoomId(selectedRoomId);

    const selectedRoom = meetingRoom.find((room) => room.id === selectedRoomId);
    if (selectedRoom) {
      onchangeMeetingRoom(selectedRoom);
    }
  };

  const onchangeMeetingRoom = (item) => {
    setSelectedKapasitas(item.capacity);
  };

  const handleTanggalRapatChange = (date) => {
    setTanggalRapat(date);
  };

  const hitungKonsumsi = (mulai, selesai) => {
    if (!mulai || !selesai) return;

    if (selesai <= mulai) {
      setErrorWaktu(
        "Waktu selesai tidak boleh lebih kecil atau sama dengan waktu mulai."
      );
      setKonsumsiState([]);
      setTotalKonsumsi(0);
      return;
    }

    setErrorWaktu("");

    const konsumsi = [];
    let totalKonsumsi = 0;

    if (mulai < "11:00" || selesai <= "11:00") {
      konsumsi.push("Snack Siang");
      const snackSiang = jenisKonsumsi.find(
        (item) => item.name === "Snack Siang"
      );
      if (snackSiang) totalKonsumsi += snackSiang.maxPrice;
    }

    if (
      (mulai < "14:00" && selesai > "11:00") ||
      (mulai >= "11:00" && mulai < "14:00")
    ) {
      konsumsi.push("Makan Siang");
      const makanSiang = jenisKonsumsi.find(
        (item) => item.name === "Makan Siang"
      );
      if (makanSiang) totalKonsumsi += makanSiang.maxPrice;
    }

    if (selesai > "14:00" || mulai >= "14:00") {
      konsumsi.push("Snack Sore");
      const snackSore = jenisKonsumsi.find(
        (item) => item.name === "Snack Sore"
      );
      if (snackSore) totalKonsumsi += snackSore.maxPrice;
    }

    setKonsumsiState(konsumsi);
    setTotalKonsumsi(totalKonsumsi);

    console.log("✅ Jenis konsumsi yang didapat:");
    konsumsi.forEach((item) => console.log("- " + item));
    console.log("✅ Total Price : " + totalKonsumsi);
  };

  const handleWaktuMulaiChange = (newTime) => {
    setWaktuMulai(newTime);
    hitungKonsumsi(newTime, waktuSelesai);
  };

  const handleWaktuSelesaiChange = (newTime) => {
    setWaktuSelesai(newTime);
    hitungKonsumsi(waktuMulai, newTime);
  };

  const handleJumlahPesertaChange = (event) => {
    let value = event.target.value;
    if (
      (selectedKapasitas && event.target.value > selectedKapasitas) ||
      selectedKapasitas === 0
    ) {
      return;
    }

    if (value.startsWith("0")) {
      value = value.replace(/^0+/, "");
    }

    if (value < 0) {
      return;
    }

    if (selectedKapasitas && value > selectedKapasitas) {
      return;
    }

    setJumlahPeserta(value);
  };

  const handleSimpan = () => {
    if (!selectedRoomId) {
      window.Swal.fire({
        title: "Harus ada Room yg dipilih",
        text: "Tolong isi peserta terlebih dahulu.",
        icon: "error",
        confirmButtonText: "Oke",
      });
      return;
    }
    if (!waktuMulai || !waktuSelesai) {
      setErrorWaktu("Waktu mulai dan waktu selesai harus diisi.");
      return;
    }

    if (waktuMulai >= waktuSelesai) {
      setErrorWaktu(
        "Waktu mulai tidak boleh lebih besar atau sama dengan waktu selesai."
      );
      return;
    }
    if (jumlahPeserta <= 0) {
      window.Swal.fire({
        title: "Harus ada peserta!",
        text: "Tolong isi peserta terlebih dahulu.",
        icon: "error",
        confirmButtonText: "Oke",
      });
      return;
    }

    const formData = {
      unitId: selectedUnitId,
      ruangMeetingId: meetingRoom.find(
        (room) => room.capacity === selectedKapasitas
      )?.id,
      tanggalRapat: tanggalRapat,
      waktuMulai: waktuMulai,
      waktuSelesai: waktuSelesai,
      jumlahPeserta: jumlahPeserta,
    };
    console.log("Data yang akan disimpan:", formData);
    window.Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil disimpan.",
      icon: "success",
      confirmButtonText: "Oke",
    });
  };

  useEffect(() => {
    fetchMeetingRoom();
    fetchUnit();
    fetchJenisKonsumsi();
  }, []);

  return (
    <>
      <div className="flex justify-start items-center ">
        <div className="flex items-center gap-4">
          <button
            style={{ backgroundColor: "#488494" }}
            onClick={() => navigate(-1)}
            className="w-[42px] h-[42px] cursor-pointer rounded-md mx-auto flex items-center justify-center text-white"
          >
            <FiChevronLeft />
          </button>

          <h2 className="text-3xl font-bold text-gray-800 ">Ruang Meeting</h2>
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-10 ml-15 flex items-center  ">
        Ruang Meeting{"  "}
        <span className="flex items-center text-cyan-800 justify-center">
          {"  "}
          <FiChevronRight /> Pesan Ruangan
        </span>
      </p>

      <div
        className="p-6 bg-white rounded-lg"
        style={{
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Pesan Ruangan</h2>

        {/* Informasi Ruang Meeting */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Informasi Ruang Meeting
          </h3>
          <div className="flex gap-4 flex-wrap max-w-[800px]">
            <div className="w-full max-w-[268px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <div className="relative w-full">
                <select
                  defaultValue={selectedUnitId}
                  onChange={handleUnitChange}
                  className="w-full h-[48px] pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm appearance-none focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option disabled value="">
                    Pilih Unit
                  </option>
                  {unit.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.officeName}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-0 h-full flex items-center">
                  <AiOutlineDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
            <div className="w-full max-w-[268px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ruang Meeting
              </label>
              <div className="relative w-full">
                <select
                  defaultValue={selectedRoomId}
                  onChange={handleRoomChange}
                  className="w-full h-[48px] border border-gray-300 pl-3 pr-10 rounded-xl appearance-none focus:outline-none"
                >
                  <option disabled value={""} className="text-gray-200">
                    Pilih Ruang Meeting
                  </option>
                  {meetingRoom
                    .filter((item) => item.officeId === selectedUnitId)
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.roomName}
                      </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-0 h-full flex items-center">
                  <AiOutlineDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>
            <div className="w-full max-w-[268px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kapasitas
              </label>
              <input
                value={selectedKapasitas}
                type="number"
                className="w-full h-[42px] bg-gray-200 border-gray-300 rounded-lg shadow-sm px-3"
                placeholder="0"
                disabled
              />
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300 mt-10 mb-10" />

        {/* Informasi Rapat */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Informasi Rapat<span className="text-red-500">*</span>
          </h3>
          <div className="flex gap-4 flex-wrap">
            <div className="w-full max-w-[268px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Rapat
              </label>
              <div className="relative w-full border border-gray-300 rounded-md">
                <FiCalendar className="absolute left-3 top-[12px] -translate-y-1/2 text-blue-500 w-5 h-5 pointer-events-none" />
                <DatePicker
                  selected={tanggalRapat}
                  onChange={handleTanggalRapatChange}
                  minDate={new Date()}
                  dateFormat="d MMMM yyyy"
                  locale="id"
                  className="w-full h-[48px] pl-10 pr-3   shadow-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="w-full max-w-[268px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Waktu Mulai
              </label>
              <CustomTimePicker
                value={waktuMulai}
                onChange={handleWaktuMulaiChange}
              />
            </div>
            <div className="w-full max-w-[268px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Waktu Selesai
              </label>
              <CustomTimePicker
                value={waktuSelesai}
                onChange={handleWaktuSelesaiChange}
              />
            </div>
          </div>
          {errorWaktu && (
            <p className="mt-2 text-sm text-red-500">{errorWaktu}</p>
          )}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Peserta
            </label>
            <input
              min={0}
              type="number"
              className="w-full max-w-[268px] border p-3 border-gray-300 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="Masukkan Jumlah Peserta"
              value={jumlahPeserta ?? null}
              onChange={handleJumlahPesertaChange}
            />
          </div>
        </div>

        {/* Jenis Konsumsi */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Jenis Konsumsi
          </h3>
          <div className="">
            {jenisKonsumsi.map((item) => (
              <div key={item.id} className="flex items-center mb-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    readOnly
                    checked={konsumsiState.includes(item.name)}
                    className="form-checkbox text-cyan-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700">{item.name}</span>
                </label>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nominal Konsumsi
            </label>
            <div className="flex items-center border h-[42px] max-w-[268px] border-gray-300 rounded-lg shadow-sm">
              <span className="w-[45px] h-full bg-gray-200 flex items-center justify-center font-medium text-gray-700 border-r border-gray-300">
                Rp
              </span>
              <input
                type="number"
                className="w-full focus:outline-none border-gray-300 rounded-lg shadow-sm focus:ring-cyan-500 focus:border-cyan-500 px-2"
                placeholder="Rp. 0"
                value={totalKonsumsi * jumlahPeserta}
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end gap-4">
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg">
            Batal
          </button>
          <button
            onClick={handleSimpan}
            className="bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded-lg"
          >
            Simpan
          </button>
        </div>
      </div>
    </>
  );
}
