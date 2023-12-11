const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
let lines = input.split("\r\n");

for (let line = lines.length - 1; line >= 0; line--) {
    if (lines[line].match(/^[.]*$/)) {
        let newStr = "";
        for (let i = 0; i < lines[line].length; i++) newStr += ".";
        lines.splice(line, 0, newStr);
    }
}

for (let line = lines[0].length - 1; line >= 0; line--) {
    let currColumn = lines.map(l => l[line]);
    let galaxies = currColumn.filter(g => g == "#");
    if (!galaxies.length) {
        for (let newLine in lines) {
            let copy = lines[newLine];
            lines[newLine] = copy.substring(0, line) +"." +copy.substring(line);
        }   
    }
}

let galaxies = [];
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] == "#") galaxies.push([i, j]);
    }
}

let totalDistance = 0;

for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        totalDistance += Math.abs(galaxies[i][0] - galaxies[j][0]);
        totalDistance += Math.abs(galaxies[i][1] - galaxies[j][1]);
    }
}

console.log(totalDistance);