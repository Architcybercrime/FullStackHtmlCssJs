

// use a while loop to calculate the factorial of a number and log the result
var num = 5;
var factorial = 1;
var i = 1;  
while (i <=num){
    factorial *= i;
    i++;        
}
console.log("Factorial of " + num + " is " + factorial);