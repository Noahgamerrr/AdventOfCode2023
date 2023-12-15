const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
let codes = input.split(",").filter(e => e.trim());

let map = new Map();

function calcHash(code) {
    let total = 0;
    for (let i = 0; i < code.length; i++) {
        total += code.charCodeAt(i);
        total *= 17;
        total %= 256;
    }
    return total;
}

for (let code of codes) {
    if (code[code.length - 1] == "-") {
        let label = code.substring(0, code.length - 1);
        let box = calcHash(label);
        let boxVal = map.get(box);
        if (boxVal) map.set(box, boxVal.filter(e => e.split(" ")[0] !== label));
    } else {
        let label = code.substring(0, code.length - 2);
        let box = calcHash(label);
        let boxVal = map.get(box);
        let lens = `${label} ${code[code.length - 1]}`;
        if (boxVal) {
            let toBeReplaced = boxVal.find(e => e.split(" ")[0] === label);
            if (toBeReplaced) {
                let replacingIndex = boxVal.indexOf(toBeReplaced);
                boxVal.splice(replacingIndex, 1, lens);
                map.set(box, boxVal);
            } else map.set(box, [...boxVal, lens]);
        } else map.set(box, [lens]);
    }
}

let result = 0;
for (let [key, values] of map.entries()) {
    for (let value in values) {
        console.log(key);
        let val = values[value];
        //console.log(val);
        result += (key + 1) * (parseInt(value) + 1) * parseInt(val[val.length - 1]);
    }
}

console.log(result);