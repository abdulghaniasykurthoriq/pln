const AdditionalTest = () => {
  // 1. Deret Fibonacci
  const fibonacci = (n) => {
    const result = [0, 1];
    for (let i = 2; i < n; i++) {
      result.push(result[i - 1] + result[i - 2]);
    }
    return result;
  };

  // 2. Fungsi untuk harga saham dengan keuntungan terbaik
  const bestBuyPrice = (prices) => {
    let minPrice = prices[0];
    let maxProfit = 0;
    let bestBuy = prices[0];

    for (let i = 1; i < prices.length; i++) {
      if (prices[i] - minPrice > maxProfit) {
        maxProfit = prices[i] - minPrice;
        bestBuy = minPrice;
      }
      if (prices[i] < minPrice) {
        minPrice = prices[i];
      }
    }

    return bestBuy;
  };

  // 3. Fungsi menghitung jumlah angka dalam array string
  const countNumbers = (arr) => {
    return arr.filter((char) => !isNaN(char) && char !== " ").length;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>1. Deret Fibonacci</h2>
      <p>{fibonacci(9).join(", ")}</p>

      <h2>2. Harga Saham Terbaik</h2>
      <ul>
        <li>[10, 9, 6, 5, 15] → {bestBuyPrice([10, 9, 6, 5, 15])}</li>
        <li>[7, 8, 3, 10, 8] → {bestBuyPrice([7, 8, 3, 10, 8])}</li>
        <li>[5, 12, 11, 12, 10] → {bestBuyPrice([5, 12, 11, 12, 10])}</li>
        <li>[7, 18, 27, 10, 29] → {bestBuyPrice([7, 18, 27, 10, 29])}</li>
        <li>[20, 17, 15, 14, 10] → {bestBuyPrice([20, 17, 15, 14, 10])}</li>
      </ul>

      <h2>3. Jumlah Angka dalam Array</h2>
      <ul>
        <li>
          ['2','h','6','u','y','t','7','j','y','h','8'] →{" "}
          {countNumbers([
            "2",
            "h",
            "6",
            "u",
            "y",
            "t",
            "7",
            "j",
            "y",
            "h",
            "8",
          ])}
        </li>
        <li>
          ['b','7','h','6','h','k','i','5','g','7','8'] →{" "}
          {countNumbers([
            "b",
            "7",
            "h",
            "6",
            "h",
            "k",
            "i",
            "5",
            "g",
            "7",
            "8",
          ])}
        </li>
        <li>
          ['7','b','8','5','6','9','n','f','y','6','9'] →{" "}
          {countNumbers([
            "7",
            "b",
            "8",
            "5",
            "6",
            "9",
            "n",
            "f",
            "y",
            "6",
            "9",
          ])}
        </li>
        <li>
          ['u','h','b','n','7','6','5','1','g','7','9'] →{" "}
          {countNumbers([
            "u",
            "h",
            "b",
            "n",
            "7",
            "6",
            "5",
            "1",
            "g",
            "7",
            "9",
          ])}
        </li>
      </ul>
    </div>
  );
};

export default AdditionalTest;
