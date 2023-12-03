const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");
const linesTranslated = [];
const nums = [];

let sum = 0;

for (let line of lines) {
    let lineTranslated = [];
    let currNum = "";
    for (let char of line) {
        if (char === ".") {
            lineTranslated.push(-1);
            if (currNum) nums.push(parseInt(currNum));   
            currNum = "";
        } else if (char.match(/\d/)) {
            currNum += char;
            lineTranslated.push(nums.length);
        } else {
            lineTranslated.push(-2);
            if (currNum) nums.push(parseInt(currNum));   
            currNum = "";
        }
    }
    if (currNum) nums.push(parseInt(currNum));   
    currNum = "";
    linesTranslated.push(lineTranslated);
}

function lookForNumbers(i, j) {
    for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
            let currVal = linesTranslated[k][l];
            if (currVal > -1 && nums[currVal] > -1) {
                sum += nums[currVal];
                nums[currVal] = -1;
            }
        }
    }
}

for (let i = 0; i < linesTranslated.length; i++) {
    for (let j = 0; j < linesTranslated[i].length; j++) {
        if (linesTranslated[i][j] === -2) lookForNumbers(i, j);
    }
}

console.log("The sum is: " +sum);