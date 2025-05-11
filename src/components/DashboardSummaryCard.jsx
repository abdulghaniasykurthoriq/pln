import CirclePercentage from "./CirclePercentage";

const DashboardSummaryCard = ({ title, percentage, amount, snacks }) => {
  return (
    <div className="bg-gray-200 rounded-xl p-4 w-64 shadow-sm">
      <h3 className="text-sm  text-gray-800 mb-2">Nama Ruangan 1</h3>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] text-gray-500">Persentase Pemakaian</p>
          <p className="text-[20px] mt-1 font-bold text-black">86.34%</p>
        </div>
        <CirclePercentage percentage={10} />
      </div>

      <p className="text-[11px] text-gray-500 mt-1">Nominal Konsumsi</p>
      <p className="text-[20px] font-bold  text-black">Rp 35.000.000</p>

      <div className="mt-2 space-y-2">
        <div className="flex items-center text-sm text-black">
          <span className="text-[10px] w-full max-w-[130px]">Snack Siang</span>
          <div className="w-full">
            <span>140</span>

            <div className="h-2 bg-gray-200 rounded-full">
              <div className="bg-sky-500 h-2 rounded-full w-[40%]"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center  text-sm text-black">
          <span className="text-[10px] w-full max-w-[130px]">Makan Siang</span>
          <div className="w-full">
            <span>140</span>

            <div className="h-2 bg-gray-200 rounded-full">
              <div className="bg-sky-500 h-2 rounded-full w-[40%]"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center  text-sm text-black">
          <span className="text-[10px] w-full max-w-[130px]">Snack Sore</span>
          <div className="w-full">
            <span>140</span>

            <div className="h-2 bg-gray-200 rounded-full">
              <div className="bg-sky-500 h-2 rounded-full w-[90%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummaryCard;
