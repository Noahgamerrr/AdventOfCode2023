const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");

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

let stepsTaken;

for (let source of Object.keys(sources)) {
    stepsTaken = 0;
    let currSource = source;
    do {
        let nextPath = sources[currSource];
        currentIndex += nextPath[0];
        currentLineIndex += nextPath[1];
        stepsTaken++;
        currentPoint = lines[currentIndex][currentLineIndex];
        let currentPipe = pipes[currentPoint];
        if (currentPipe) currSource = currentPipe[currSource];
    } while(currentPoint !== "S" && currSource)
    if (stepsTaken) break;
}

stepsTaken = parseInt(stepsTaken / 2) + stepsTaken % 2;

console.log(stepsTaken);