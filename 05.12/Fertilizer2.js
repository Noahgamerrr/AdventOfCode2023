const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n").filter(e => e);
let seeds = lines[0].split(" ").map(e => parseInt(e));
seeds.shift();

seeds = seeds.reduce((acc, curr) => {
    const currRange = acc[acc.length - 1];
    if (currRange && currRange.length % 2) currRange.push(curr + currRange[0] - 1);
    else acc.push([curr]);
    return acc;
}, []);

let mappers = [];
let currentMapper = -1;
for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(" ").map(e => parseInt(e));
    if (lines[i].includes("map")) {
        currentMapper++;
        mappers[currentMapper] = [] 
    } else mappers[currentMapper].push(values);
}


seeds = seeds.map(s => {
    let allSeeds = [s];
    for (let mapperList of mappers) {
        let mappedSeeds = [];
        for (let seed of allSeeds) {
            let [seedLow, seedHigh] = seed;
            let foundMappers = mapperList.filter(m => (seedHigh >= m[1] && seedLow < m[1]) 
            || (seedLow <= (m[1] + m[2] - 1) && seedHigh > (m[1] + m[2] - 1))
            || (seedLow >= m[1] && seedHigh <= (m[1] + m[2] - 1)));
            foundMappers.sort((a, b) => a[1] - b[1]);
            for (let mapper of foundMappers) {
                let offset = mapper[0] - mapper[1];
                let mapLow = mapper[1];
                let mapHigh = mapper[1] + mapper[2] - 1;
                if (mapLow < seedLow) {
                    mappedSeeds.push([seedLow + offset, mapHigh + offset]);
                    seedLow = mapHigh + 1;
                }
                else if (mapHigh > seedHigh) {
                    mappedSeeds.push([mapLow + offset, seedHigh + offset]);
                    seedHigh = mapLow - 1;
                }
                else {
                    if (seedLow < mapLow) mappedSeeds.push([seedLow, mapLow - 1]);
                    mappedSeeds.push([mapLow + offset, mapHigh + offset]);
                    seedLow = mapHigh + 1;
                }
            }
            if (seedLow < seedHigh) mappedSeeds.push([seedLow, seedHigh]);
        }
        allSeeds = mappedSeeds;
    }
    allSeeds = allSeeds.map(e => e[0]);
    return Math.min(...allSeeds);
});

seeds = seeds.filter(e => e);

const lowest = Math.min(...seeds);
console.log("Lowest location: " +lowest);
