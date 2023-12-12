const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
let lines = input.split("\r\n");

lines = lines.map(l => {
    let [gears, nums] = l.split(" ");
    let gearsCopy = gears, numsCopy = nums;
    for (let i = 0; i < 4; i++) {
        gears += "?" +gearsCopy;
        nums += "," +numsCopy;
    }
    return gears + " " +nums;
});

function validateGears(gears, nums) {
    let brokenGears = 0;
    let numsCopy = [...nums];
    for (let i = 0; i < gears.length; i++) {
        if (gears[i] == "#") brokenGears++;
        else if (brokenGears) {
            if (brokenGears != numsCopy[0]) return false;
            brokenGears = 0;
            numsCopy.shift();
        }
    }
    if (numsCopy.length > 1) return false;
    return true;
}

function insertFaultyGears(gears, nums, unsure, toBeInserted) {
    if (!toBeInserted) {
        if (validateGears(gears, nums)) return 1;
        else return 0;
    }
    let combinations = 0;
    let unsureCopy = [...unsure]
    for (let i = 0; i < unsure.length; i++) {
        let current = unsureCopy.shift();
        let currentGears = gears.substring(0, current) +"#" + gears.substring(current + 1);
        combinations += insertFaultyGears(currentGears, nums, unsureCopy, toBeInserted - 1);
    }
    return combinations;
}

function calcPossibilities(line) {
    let [gears, nums] = line.split(" ");
    nums = nums.split(",").filter(e => e).map(e => parseInt(e));
    let totalNums = nums.reduce((acc, curr) => acc + curr, 0);
    let knownDefect = gears.replace(/[.?]/gi, "").length;
    let toBeInserted = totalNums - knownDefect;
    let unsure = [];
    for (let i = 0; i < line.length; i++) {
        if (line[i] == "?") unsure.push(i);
    }
    return insertFaultyGears(gears, nums, unsure, toBeInserted);
}

let result = lines.reduce((acc, curr) => {
    console.log("Calculating: " +curr);
    return acc + calcPossibilities(curr);
}, 0);

console.log(result);