const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");
const times = lines[0].split(":")[1].split(" ").filter(e => e).map(e => parseInt(e));
const distances = lines[1].split(":")[1].split(" ").filter(e => e).map(e => parseInt(e));

let possibilities = [];

for (let time in times) {
    const currentTime = times[time];
    const currentRecord = distances[time];
    let firstRecordBreaker = 0;
    while (firstRecordBreaker * (currentTime - firstRecordBreaker) <= currentRecord) firstRecordBreaker++;
    console.log(firstRecordBreaker);
    possibilities.push(currentTime - 2 * (firstRecordBreaker - 1) - 1);
}

console.log(possibilities);

let totalPossibilities = possibilities.reduce((acc, curr) => acc * curr, 1);

console.log("Total number of ways: " +totalPossibilities);