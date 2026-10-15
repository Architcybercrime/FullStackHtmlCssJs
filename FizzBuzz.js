

// print fizz if a number is divisible by 3, buzz if it is divisible by 5, and fizzbuzz if it is divisible by both 3 and 5
var i=11;
    if (i%3===0 && i%5===0){
        console.log("FizzBuzz");
    }
    else if (i%3==0){
        console.log("Fizz");
    }
    else if (i%5==0){
        console.log("Buzz");
    }   
    else{
        console.log(i);
    }
