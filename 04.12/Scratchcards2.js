const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");
let scratchcards = [...lines].fill(1, 0, lines.length);

for (let line in lines) {
    const lineNum = parseInt(line);
    let total = 0;
    let [winning, own] = lines[line].split("|");
    winning = winning.split(":")[1].split(" ").filter(e => e);
    own = own.split(" ").filter(e => e);
    for (let number of own) {
        if (winning.includes(number)) total++;
    };
    for (let i = lineNum + 1; i <= lineNum + total; i++) {
        if (scratchcards[i]) scratchcards[i] += scratchcards[lineNum];
    }
}

const res = scratchcards.reduce((acc, curr) => acc + curr, 0);

console.log("The result is: " +res);
