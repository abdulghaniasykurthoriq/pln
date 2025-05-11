// 1. Deret Fibonacci
function fibonacci(n) {
  const result = [0, 1];
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result;
}

console.log("1. Deret Fibonacci (9 angka):");
console.log(fibonacci(9));

// 2. Fungsi untuk harga saham dengan keuntungan terbaik
function bestBuyPrice(prices) {
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
}

console.log("\n2. Harga saham terbaik:");
console.log(
  "Input: [10, 9, 6, 5, 15] -> Output:",
  bestBuyPrice([10, 9, 6, 5, 15])
);
console.log(
  "Input: [7, 8, 3, 10, 8] -> Output:",
  bestBuyPrice([7, 8, 3, 10, 8])
);
console.log(
  "Input: [5, 12, 11, 12, 10] -> Output:",
  bestBuyPrice([5, 12, 11, 12, 10])
);
console.log(
  "Input: [7, 18, 27, 10, 29] -> Output:",
  bestBuyPrice([7, 18, 27, 10, 29])
);
console.log(
  "Input: [20, 17, 15, 14, 10] -> Output:",
  bestBuyPrice([20, 17, 15, 14, 10])
);

// 3. Fungsi menghitung jumlah angka dalam array
function countNumbers(arr) {
  return arr.filter((char) => !isNaN(char) && char !== " ").length;
}

console.log("\n3. Jumlah angka dalam array:");
console.log(
  "Input: ['2','h','6','u','y','t','7','j','y','h','8'] -> Output:",
  countNumbers(["2", "h", "6", "u", "y", "t", "7", "j", "y", "h", "8"])
);
console.log(
  "Input: ['b','7','h','6','h','k','i','5','g','7','8'] -> Output:",
  countNumbers(["b", "7", "h", "6", "h", "k", "i", "5", "g", "7", "8"])
);
console.log(
  "Input: ['7','b','8','5','6','9','n','f','y','6','9'] -> Output:",
  countNumbers(["7", "b", "8", "5", "6", "9", "n", "f", "y", "6", "9"])
);
console.log(
  "Input: ['u','h','b','n','7','6','5','1','g','7','9'] -> Output:",
  countNumbers(["u", "h", "b", "n", "7", "6", "5", "1", "g", "7", "9"])
);
