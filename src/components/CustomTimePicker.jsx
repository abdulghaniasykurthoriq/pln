import React, { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

const CustomTimePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timePickerRef = useRef(null); // Referensi untuk elemen dropdown
  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  const handleHourChange = (e) => {
    const newHour = e.target.value;
    const [_, minute] = (value || "00:00").split(":");
    onChange(`${newHour}:${minute || "00"}`);
  };

  const handleMinuteChange = (e) => {
    const newMinute = e.target.value;
    const [hour] = (value || "00:00").split(":");
    onChange(`${hour || "00"}:${newMinute}`);
    setIsOpen(false); // Tutup dropdown setelah memilih menit
  };

  // Tutup dropdown jika pengguna mengklik di luar elemen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        timePickerRef.current &&
        !timePickerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[268px]" ref={timePickerRef}>
      {/* Input Display */}
      <div
        className="w-full h-[48px] pl-3 pr-10 border border-gray-300 rounded-lg shadow-sm flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-gray-800" : "text-gray-400"}>
          {value || "Pilih Waktu Mulai"}
        </span>
        <FiChevronDown className="absolute right-3 text-gray-500" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 w-full">
          <div className="flex">
            <select
              className="w-1/2 p-2 border-r border-gray-300"
              value={value.split(":")[0] || "00"}
              onChange={handleHourChange}
            >
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <select
              className="w-1/2 p-2"
              value={value.split(":")[1] || "00"}
              onChange={handleMinuteChange}
            >
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomTimePicker;
