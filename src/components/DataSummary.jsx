const DataSummary = ({ data }) => {
  return (
    <div className="p-6">
      {data.map((periodItem) => (
        <div key={periodItem.id} className="mb-8">
          <h2 className="text-xl font-bold mb-4">
            Periode: {periodItem.period}
          </h2>
          {periodItem.data.map((office) => (
            <div key={office.officeName} className="mb-4">
              <h3 className="text-lg font-semibold">{office.officeName}</h3>
              {office.detailSummary.map((room) => (
                <div key={room.roomName} className="ml-4 mb-2">
                  <p className="font-medium">- {room.roomName}</p>
                  <ul className="ml-4 list-disc">
                    {room.totalConsumption.map((item, index) => (
                      <li key={index}>
                        {item.name}: {item.totalPackage} paket - Rp
                        {parseInt(item.totalPrice).toLocaleString("id-ID")}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DataSummary;
