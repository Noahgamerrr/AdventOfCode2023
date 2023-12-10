const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
let lines = input.split("\r\n");

const sources = {
    N: [1, 0],
    E: [0, -1],
    S: [-1, 0],
    W: [0, 1]
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

let inLoop = [];
let partOfLoop = [];

for (let source of Object.keys(sources)) {
    stepsTaken = 0;
    let currSource = source;
    do {
        let nextPath = sources[currSource];
        currentIndex += nextPath[0];
        currentLineIndex += nextPath[1];
        currentPoint = lines[currentIndex][currentLineIndex];
        let currentPipe = pipes[currentPoint];
        if (currentPipe) currSource = currentPipe[currSource];
    } while(currentPoint !== "S" && currSource)
    if (stepsTaken) break;
}

/*


let innerFields = 0;

let onBorder = false;

function findNeighboringFields(i, j, foundFields) {
    for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
            let withinBoxHeight = k > 0 && k < boxArray.length;
            let withinBoxWidth = l > 0 && l < boxArray[i].length;
            if (!withinBoxHeight || !withinBoxWidth) onBorder = true;
            else if (boxArray[k][l] != 'R') {
                boxArray[k] = boxArray[k].substring(0, l) +'R' + lines[k].substring(l + 1);
                foundFields++;
                //if (k !== 0 && l !== 0) foundFields = 
                findNeighboringFields(k, l, foundFields);
            }
        }
    }
    if (onBorder) return 0;
    return foundFields;
}

for (let i = 0; i < boxArray.length; i++) {
    for (let j = 0; j < boxArray[i].length; j++) {
        if (boxArray[i][j] !== 'R') {
            onBorder = false;
            let neighboringFields = findNeighboringFields(i, j, 0);
            if (neighboringFields) {
                console.log(i +" " +j +" " +boxArray[i][j]);
                innerFields += neighboringFields;
                //console.log(neighboringFields)
            }
        }
    }
}*/

console.log(innerFields);