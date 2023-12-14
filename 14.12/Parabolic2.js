const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
let lines = input.split("\r\n");

let result = 0;

for (let i = 0; i < lines[0].length; i++) {
    let rolledColumn = [];
    let dots = [];
    for (let line of lines) {
        switch (line[i]) {
            case "O": 
                rolledColumn.push(1);
                break;
            case ".":
                dots.push(0);
                break;
            case "#":
                rolledColumn.push(...dots);
                rolledColumn.push(0);
                dots = [];
                break;
        }
    }
    rolledColumn.push(...dots);
    while (rolledColumn.length) result += rolledColumn.length * rolledColumn.shift();
}

console.log(result);