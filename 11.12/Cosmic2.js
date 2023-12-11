const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
let lines = input.split("\r\n");

let emptyRows = [];
let emptyColumns = [];

for (let line = 0; line < lines.length; line++) {
    if (lines[line].match(/^[.]*$/)) emptyRows.push(line);
}

for (let line = 0; line < lines[0].length; line++) {
    let currColumn = lines.map(l => l[line]);
    let galaxies = currColumn.filter(g => g == "#");
    if (!galaxies.length) emptyColumns.push(line);
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
        let galaxy1 = galaxies[i], galaxy2 = galaxies[j];
        let [startRow, endRow] = [Math.min(galaxy1[0], galaxy2[0]), Math.max(galaxy1[0], galaxy2[0])];
        let [startColumn, endColumn] = [Math.min(galaxy1[1], galaxy2[1]), Math.max(galaxy1[1], galaxy2[1])];
        let warpDistances = 0;
        warpDistances += emptyRows.filter(e => e > startRow && e < endRow).length;
        warpDistances += emptyColumns.filter(e => e > startColumn && e < endColumn).length;
        totalDistance += Math.abs(galaxy1[0] - galaxy2[0]);
        totalDistance += Math.abs(galaxy1[1] - galaxy2[1]);
        totalDistance += 999999 * warpDistances;
    }
}

console.log(totalDistance);