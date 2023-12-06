const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");
const time = parseInt(lines[0].split(":")[1].split(" ").reduce((acc, curr) => acc + curr, ""));
const distance = parseInt(lines[1].split(":")[1].split(" ").reduce((acc, curr) => acc + curr, ""));

console.log(time);
console.log(distance);

let possibility = 0;
for (let i = 1; i <= time / 2; i++) {
    if (i * (time - i) > distance) {
        if (i === (time / 2)) possibility++;
        else possibility += 2;
    }
}

console.log("Total number of ways: " +possibility);