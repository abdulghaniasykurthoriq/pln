const CirclePercentage = ({ percentage }) => {
  const radius = 16; // Radius lingkaran (disesuaikan untuk ukuran 38x38)
  const circumference = 2 * Math.PI * radius; // Keliling lingkaran
  const offset = circumference - (percentage / 100) * circumference; // Hitung offset berdasarkan persentase

  return (
    <div className="w-[38px] h-[38px] relative">
      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 40 40">
        {/* Lingkaran abu-abu sebagai background */}
        <circle
          className="text-gray-300"
          cx="20" // Pusat lingkaran (setengah dari viewBox)
          cy="20" // Pusat lingkaran (setengah dari viewBox)
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8" // Ketebalan lingkaran background
        />
        {/* Lingkaran biru untuk persentase */}
        <circle
          className="text-sky-500"
          cx="20"
          cy="20"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8" // Ketebalan lingkaran indikator
          strokeDasharray={circumference} // Total keliling lingkaran
          strokeDashoffset={offset} // Offset berdasarkan persentase
          strokeLinecap="round" // Ujung garis membulat
          transform="rotate(-90 20 20)" // Memulai dari 0 derajat (atas lingkaran)
        />
      </svg>
    </div>
  );
};

export default CirclePercentage;
