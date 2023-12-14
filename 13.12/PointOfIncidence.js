const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
let lines = input.split("\r\n");

let patterns = lines.reduce((acc, line) => {
    if (!line.trim()) acc.push([]);
    else acc[acc.length - 1].push(line);
    return acc;
}, [[]]);

function horizontalMirror(pattern) {
    for (let i = 1; i < pattern.length; i++) {
        let mirrorLen = Math.min(i, pattern.length - i);
        let start = pattern.slice(i - mirrorLen, i);
        let end = pattern.slice(i, i + mirrorLen);
        if (start.join("|") == end.reverse().join("|")) return i;
    }
    return 0;
}

function verticalToHorizontal(pattern) {
    let newPattern = [];
    for (let i = 0; i < pattern[0].length; i++) {
        let row = "";
        for (let j = pattern.length -1 ; j >= 0; j--) {
            row += pattern[j][i];
        }
        newPattern.push(row);
    }
    return newPattern;
}

let result = 0;

for (let pattern of patterns) {
    let horizontal = horizontalMirror(pattern);
    let vertical = horizontalMirror(verticalToHorizontal(pattern));
    if (horizontal > vertical) result += horizontal * 100;
    else result += vertical;
}

console.log(result);