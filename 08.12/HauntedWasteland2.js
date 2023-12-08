const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");
const instructions = lines[0];

let maps = {};
let currentPositions = [];

for (let i = 2; i < lines.length; i++) {
    let [current, next] = lines[i].split("=");
    current = current.trim();
    next = next.trim();
    let hops = [...next.matchAll(/[A-Z]{3}/g)];
    hops = hops.map(e => e[0]);
    maps[current] = hops;
    if (current.endsWith('A')) currentPositions.push(current);
}

function getStepsCount(currentPos) {
    let totalHops = 0;
    while (!currentPos.endsWith('Z')) {
        let currentInstruction = instructions[totalHops % instructions.length] === "L" ? 0 : 1;
        currentPos = maps[currentPos][currentInstruction];
        totalHops++;
    }
    return totalHops;
}

function gcd(a, b) { 
    for (let temp = b; b !== 0;) { 
        b = a % b; 
        a = temp; 
        temp = b; 
    } 
    return a; 
} 
  
function lcm(a, b) { 
    const gcdValue = gcd(a, b);
    return (a * b) / gcdValue; 
} 

currentPositions = currentPositions.map(getStepsCount);

let totalHops = currentPositions.reduce(lcm, 1);

console.log("Total steps: " +totalHops);