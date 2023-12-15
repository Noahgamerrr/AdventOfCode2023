const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
let codes = input.split(",").filter(e => e.trim());

codes = codes.map(code => {
    let total = 0;
    for (let i = 0; i < code.length; i++) {
        total += code.charCodeAt(i);
        total *= 17;
        total %= 256;
    }
    return total;
});

let result = codes.reduce((acc, curr) => acc + curr, 0);

console.log(result);