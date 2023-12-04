const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");
const res = lines.reduce((acc, line) => {
    let total = 0;
    let [winning, own] = line.split("|");
    winning = winning.split(":")[1].split(" ").filter(e => e);
    own = own.split(" ").filter(e => e);
    for (let number of own) {
        if (winning.includes(number)) {
            if (total === 0) total = 1;
            else total *= 2;
        }
    };
    return acc + total;
}, 0);

console.log("The result is: " +res);
