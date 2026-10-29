const number = Math.floor(Math.random() * 10) + 1;
const guess = prompt("tumhare paas 10 raaste hai, konsa ek chunoge?");

if (Number(guess) === number) {
    alert("Sahi pakde haiii!");
} else {
    alert(`Galat jawaab, sahi uttar ${number} hai. ab tumhara khel khatam hai!`);
}