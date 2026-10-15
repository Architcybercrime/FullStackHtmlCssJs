const number = 253;
const digits = String(number); // Convert the number to a string to get its digits
const power = digits.length;// Gettting the length of the number jo humko chahiye

let sum = 0;
for (const digit of digits) {
  sum += Number(digit) ** power; // logic jo apne ko chahiye
}

if (sum === number) {
  console.log(`${number} is an Armstrong number.`); // this runs if we get apna answer
} else {
  console.log(`${number} is not an Armstrong number.`); // this appears if we just sucks!
  
}
