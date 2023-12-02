const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");
const res = lines.reduce((acc, curr) => {
    let gameData = curr.split(":")[1];
    let drawnCubes = gameData.split(/[,|;]/g).map(e => e.trim());
    let maxCubesByColor = [0, 0, 0];
    for (let game of drawnCubes) {
        let [num, colour] = game.split(" ");
        if (colour === "red" && num > maxCubesByColor[0]) maxCubesByColor[0] = parseInt(num);
        if (colour === "green" && num > maxCubesByColor[1]) maxCubesByColor[1] = parseInt(num);
        if (colour === "blue" && num > maxCubesByColor[2]) maxCubesByColor[2] = parseInt(num);
    }
    console.log(maxCubesByColor);
    let power = 1
    for (let num of maxCubesByColor) power *= num;
    return acc + power;
}, 0);

console.log("The result is: " +res);