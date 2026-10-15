
// write and arrow function that takes a string as an argument and returns true if the string is a palindrome, false otherwise
const isPalindrome = (str) => {
    const reversedStr = str.split('').reverse().join('');
    return str === reversedStr;
};  
console.log(isPalindrome("racecar"));