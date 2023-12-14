const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
let lines = input.split("\r\n");

function verticalToHorizontal(field) {
    let newField = [];
    for (let i = 0; i < field[0].length; i++) {
        let row = "";
        for (let j = field.length -1 ; j >= 0; j--) {
            row += field[j][i];
        }
        newField.push(row);
    }
    return newField;
}

function moveRollingStones() {
    let rolledColumn = [];
    for (let i = 0; i < lines[0].length; i++) {
        let rollingColumn = [];
        let dots = [];
        for (let line of lines) {
            switch (line[i]) {
                case "O": 
                    rollingColumn.push("O");
                    break;
                case ".":
                    dots.push(".");
                    break;
                case "#":
                    rollingColumn.push(...dots);
                    rollingColumn.push("#");
                    dots = [];
                    break;
            }
        }
        rollingColumn.push(...dots);
        rolledColumn.push(rollingColumn.reverse().join(""));
    }
    return rolledColumn;
}

let linesCopies = [];

let finalField = [];

for (let i = 0; i < 1000000000; i++) {
    for (let j = 0; j < 4; j++) lines = moveRollingStones();
    let linesStr = lines.join("|");
    if (linesCopies.includes(linesStr)) {
        let firstCycle = linesCopies.indexOf(linesStr);
        let cycleLength = i - firstCycle;
        let partOfCycle = (999999999 - i) % cycleLength;
        finalField = firstCycle + partOfCycle;
        lines = linesCopies[finalField].split("|");
        break;
    }
    else linesCopies.push(linesStr);
}

lines = verticalToHorizontal(lines);

let result = lines.reduce((acc, line) => {
    let lineCopy = line;
    let total = 0;
    for (let i = 0; i < line.length; i++) {
        total += lineCopy[i] == 'O' ? i + 1 : 0;
    }
    return acc + total;
}, 0);

console.log(result);