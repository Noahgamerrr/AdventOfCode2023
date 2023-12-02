const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");
const res = lines.reduce((acc, curr) => {
    let lineData = curr.split(":");
    let gameNumber = parseInt(lineData[0].replace(/\D/g, ''));
    let drawnCubes = lineData[1].split(/[,|;]/g).map(e => e.trim());
    let riskyGames = drawnCubes.filter(e => e.split(" ")[0] > 12);
    for (let risk of riskyGames) {
        const [cubes, colour] = risk.split(" ");
        if (colour === "red" && cubes > 12) return acc;
        if (colour === "green" && cubes > 13) return acc;
        if (colour === "blue" && cubes > 14) return acc;
    }
    return acc + gameNumber;
}, 0);

console.log("The result is: " +res);