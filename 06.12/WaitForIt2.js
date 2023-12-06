const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");
const time = parseInt(lines[0].split(":")[1].split(" ").reduce((acc, curr) => acc + curr, ""));
const distance = parseInt(lines[1].split(":")[1].split(" ").reduce((acc, curr) => acc + curr, ""));

let firstRecordBreaker = 0;

while (firstRecordBreaker * (time - firstRecordBreaker) <= distance) firstRecordBreaker++;
const possibility = time - 2 * (firstRecordBreaker - 1) - 1;

console.log("Total number of ways: " +possibility);