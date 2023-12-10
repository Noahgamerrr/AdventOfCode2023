const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
let lines = input.split("\r\n");

const sources = {
    N: [1, 0],
    E: [0, -1],
    S: [-1, 0],
    W: [0, 1]
}

const sidesOfLoop = {
    N: [[0, 1], [0, -1]],
    E: [[1, 0], [-1, 0]],
    S: [[0, -1], [0, 1]],
    W: [[-1, 0], [1, 0]]
}

const pipes = {
    "|" : {
        N: "N",
        S: "S"
    },
    "-" : {
        W: "W",
        E: "E"
    },
    F : {
        S: "W",
        E: "N"
    },
    7 : {
        S: "E",
        W: "N"
    },
    J : {
        N: "E",
        W: "S"
    },
    L : {
        N: "W",
        E: "S"
    }
}

const startLine = lines.find(e => e.includes("S"));
let currentIndex = lines.indexOf(startLine);

let currentLineIndex = startLine.indexOf("S");
let currentPoint = lines[currentIndex][currentLineIndex];

let inLoop = [[], []];

for (let source of Object.keys(sources)) {
    startAndEndSource = [];
    stepsTaken = 0;
    let currSource = source;
    do {
        let nextPath = sources[currSource];
        lines[currentIndex] = lines[currentIndex].substring(0, currentLineIndex) + "R" + lines[currentIndex].substring(currentLineIndex + 1);
        currentIndex += nextPath[0];
        currentLineIndex += nextPath[1];
        inLoop[0].push([currentIndex + sidesOfLoop[currSource][0][0], currentLineIndex + sidesOfLoop[currSource][0][1]])
        inLoop[1].push([currentIndex + sidesOfLoop[currSource][0][1], currentLineIndex + sidesOfLoop[currSource][1][1]])
        currentPoint = lines[currentIndex][currentLineIndex];
        let currentPipe = pipes[currentPoint];
        if (currentPipe) currSource = currentPipe[currSource];
    } while( currentPoint != "R");
    startAndEndSource.push(currSource);
    if (stepsTaken) break;
}

let extremes = inLoop.map(curr => curr.reduce((acc, currArr) => currArr[0] > acc ? currArr[0]: acc, 0));
if (extremes[0] > extremes[1]) inLoop = inLoop[1];
else inLoop = inLoop[0];


inLoop = inLoop.filter(e => lines[e[0]][e[1]] != 'R');

let distinct = [];

for (let i = inLoop.length - 1; i >= 0; i--) {
    if (distinct.includes(JSON.stringify(inLoop[i]))) inLoop.splice(i, 1);
    else distinct.push(JSON.stringify(inLoop[i]));
}

let innerFields = 0;
let onBorder = false;

function findNeighboringFields(i, j, foundFields) {
    for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
            if (k != i && l != j) continue;
            let withinBoxHeight = k > 0 && k < lines.length;
            let withinBoxWidth = l > 0 && l < lines[i].length;
            if (!withinBoxHeight || !withinBoxWidth) onBorder = true;
            else if (lines[k][l] != 'R') {
                lines[k] = lines[k].substring(0, l) +'R' + lines[k].substring(l + 1);
                foundFields++;
                foundFields = findNeighboringFields(k, l, foundFields), foundFields;
            }
        }
    }
    if (onBorder) return 0;
    return foundFields;
}

inLoop.sort((a, b) => a[0] - b[0]);

for (let loop of inLoop) {
    onBorder = false;
    let foundNeighbors = findNeighboringFields(loop[0], loop[1], 0);
    console.log(foundNeighbors +" " +loop);
    innerFields += foundNeighbors;
}

console.log(innerFields);