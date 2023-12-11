const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
let lines = input.split("\r\n");

function findEmptyRows(start, end) {
    let emptyRows = 0;
    for (let line = end - 1; line > start; line--) {
        if (lines[line].match(/^[.]*$/)) emptyRows++;
    }
    return emptyRows;
}

function findEmptyColumns(start, end) {
    let emptyColumns = 0;
    for (let line = end - 1; line > start; line--) {
        let currColumn = lines.map(l => l[line]);
        let galaxies = currColumn.filter(g => g == "#");
        if (!galaxies.length) emptyColumns++;
    }
    return emptyColumns;
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
        warpDistances += findEmptyRows(startRow, endRow);
        warpDistances += findEmptyColumns(startColumn, endColumn);
        totalDistance += Math.abs(galaxy1[0] - galaxy2[0]);
        totalDistance += Math.abs(galaxy1[1] - galaxy2[1]);
        totalDistance += 999999 * warpDistances;
    }
}

console.log(totalDistance);