// create factorial function while using memoaization in javascipt 
 console.log("closures- implementation");

const factorial = (() => {
  const cache = {};
  return n => (n <= 1 ? 1 : cache[n] || (cache[n] = n * factorial(n - 1)));
})();

console.log(factorial(5));