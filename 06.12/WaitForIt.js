const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");
const times = lines[0].split(":")[1].split(" ").filter(e => e).map(e => parseInt(e));
const distances = lines[1].split(":")[1].split(" ").filter(e => e).map(e => parseInt(e));

let possibilities = [];

for (let time in times) {
    const currentTime = times[time];
    const currentRecord = distances[time];
    let possibility = 0;
    for (let i = 1; i <= currentTime / 2; i++) {
        if (i * (currentTime - i) > currentRecord) {
            if (i === (currentTime / 2)) possibility++;
            else possibility += 2;
        }
    }
    possibilities.push(possibility);
}

console.log(possibilities);

let totalPossibilities = possibilities.reduce((acc, curr) => acc * curr, 1);

console.log("Total number of ways: " +totalPossibilities);