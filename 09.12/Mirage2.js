const fs = require("fs");

const input = fs.readFileSync('./input.txt').toString();
let lines = input.split("\r\n");
lines = lines.map(l => l.split(" ").map(n => parseInt(n)));

let result = lines.reduce((acc, curr) => {
    let tree = [curr];
    let finished = false;
    while (!finished) {
        finished = true;
        let current = tree[tree.length - 1];
        let next = [];
        for (let i = 1; i < current.length; i++) {
            let distances = current[i] - current[i - 1];
            if (distances) finished = false;
            next.push(distances);
        }
        tree.push(next);
    }
    for (let i = tree.length - 2; i >= 0; i--) {
        let current = tree[i], next = tree[i + 1];
        current.unshift(current[0] - next[0]);
    }
    return acc + tree[0][0];
}, 0);

console.log("The result is: " +result);