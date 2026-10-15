const testScores = [85, 90, 78, 92, 88];
let totalScore = 0;
for (let i = 0; i < testScores.length; i++) {
    totalScore += testScores[i];
}
const averageScore = totalScore / testScores.length;
console.log("Average score:", averageScore);
