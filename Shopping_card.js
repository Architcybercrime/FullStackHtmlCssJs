


// uee the .reduce() method on an array of item prices to calculate the total price and log the result
let itemPrices = [10, 20, 30, 40, 50];
let totalPrice = itemPrices.reduce((acc, curr) => acc + curr, 0);  
console.log(totalPrice);