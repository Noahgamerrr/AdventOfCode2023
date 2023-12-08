const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");
const instructions = lines[0];

let maps = {};
for (let i = 2; i < lines.length; i++) {
    let [current, next] = lines[i].split("=");
    current = current.trim();
    next = next.trim();
    let hops = [...next.matchAll(/[A-Z]{3}/g)];
    hops = hops.map(e => e[0]);
    maps[current] = hops;
}

let totalHops = 0;
let currentPos = 'AAA';

while (currentPos != 'ZZZ') {
    let currentInstruction = instructions[totalHops % instructions.length] === "L" ? 0 : 1;
    currentPos = maps[currentPos][currentInstruction];
    totalHops++;
}

console.log("Total steps: " +totalHops);