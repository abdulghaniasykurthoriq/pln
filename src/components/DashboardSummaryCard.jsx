import CirclePercentage from "./CirclePercentage";

const DashboardSummaryCard = (room) => {
  console.log(room);

  return (
    <>
      {room.detailSummary.map((item, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-xl p-4 w-64 shadow-sm mb-2"
        >
          <h3 className="text-sm  text-gray-800 mb-2">{item.roomName}</h3>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] text-gray-500">Persentase Pemakaian</p>
              <p className="text-[20px] mt-1 font-bold text-black">
                {item.averageOccupancyPerMonth}%
              </p>
            </div>
            <CirclePercentage percentage={item.averageOccupancyPerMonth} />
          </div>

          <p className="text-[11px] text-gray-500 mt-1">Nominal Konsumsi</p>
          <p className="text-[20px] font-bold text-black">
            Rp{" "}
            {item.totalConsumption
              .reduce((sum, curr) => sum + parseInt(curr.totalPrice), 0)
              .toLocaleString("id-ID")}
          </p>

          {item.totalConsumption.map((consumption, index) => (
            <div key={index} className="mt-2 space-y-2">
              <div className="flex items-center text-sm text-black">
                <span className="text-[10px] w-full max-w-[130px]">
                  {consumption.name}
                </span>
                <div className="w-full">
                  <span> {consumption.totalPackage}</span>

                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="bg-sky-500 h-2 rounded-full max-w-[100%]"
                      style={{
                        width: `${parseInt(consumption.totalPackage)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default DashboardSummaryCard;
