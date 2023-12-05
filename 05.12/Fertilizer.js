const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n").filter(e => e);
let seeds = lines[0].split(" ").map(e => parseInt(e));
seeds.shift();

let mappers = [];
let currentMapper = -1;
for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(" ").map(e => parseInt(e));
    if (lines[i].includes("map")) {
        currentMapper++;
        mappers[currentMapper] = [] 
    } else mappers[currentMapper].push(values);
}

seeds = seeds.map(e => {
    for (let mapperList of mappers) {
        const mapper = mapperList.find(m => e >= m[1] && e < (m[1] + m[2]));
        if (mapper) e += (mapper[0] - mapper[1]);
    }
    return e;
})

const lowest = Math.min(...seeds);
console.log("Lowest location: " +lowest);
