let movies = [
    { title: "Inception", rating: 4 },
    { title: "The Dark Knight", rating: 5 },
    { title: "Avengers Doomsday", rating: 5 },
    { title: "krish 4", rating: 3 }
];

let firstFiveStarMovie = movies.find((movie) => movie.rating === 5);
console.log(firstFiveStarMovie.title);