const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");

let alreadyPassed = [];

function moveForward(pos, dir) {
    let [cursorX, cursorY] = pos, [dirVertical, dirHorizontal] = dir;
    cursorX += dirVertical;
    cursorY += dirHorizontal;
    traverseField([cursorX, cursorY], dir);
}

function traverseField(pos, dir) {
    const paramsJSON = JSON.stringify(pos) +" " +JSON.stringify(dir);
    if (pos[0] >= lines.length || pos[1] >= lines[0].length || pos[0] < 0 || pos[1] < 0) return;
    if (alreadyPassed.includes(paramsJSON)) return;
    let [cursorX, cursorY] = pos, [dirVertical, dirHorizontal] = dir;
    alreadyPassed.push(paramsJSON);
    switch (lines[cursorX][cursorY]) {
        case '.':
            moveForward(pos, dir);
            break;
        case '|':
            if (dirVertical) moveForward(pos, dir);
            else {
                moveForward(pos, [1, 0]);
                moveForward(pos, [-1, 0]);
            }
            break;
        case '-':
            if (dirHorizontal) moveForward(pos, dir);
            else {
                moveForward(pos, [0, 1]);
                moveForward(pos, [0, -1]);
            }
            break;
        case '/':
            if (dirVertical == -1) moveForward(pos, [0, 1]);
            else if (dirVertical == 1) moveForward(pos, [0, -1]);
            else if (dirHorizontal == -1) moveForward(pos, [1, 0]);
            else moveForward(pos, [-1, 0]);
            break;
        case '\\':
                if (dirVertical == -1) moveForward(pos, [0, -1]);
                else if (dirVertical == 1) moveForward(pos, [0, 1]);
                else if (dirHorizontal == -1) moveForward(pos, [-1, 0]);
                else moveForward(pos, [1, 0]);
                break;
    }
}

traverseField([0, 0], [0, 1]);

alreadyPassed = alreadyPassed.reduce((acc, curr) => {
    if (!acc.find(e => e.split(" ")[0] == curr.split(" ")[0])) acc.push(curr);
    return acc;
}, []);

console.log(alreadyPassed.length);