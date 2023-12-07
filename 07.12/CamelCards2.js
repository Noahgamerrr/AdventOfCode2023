const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");

const cardVal = {
    A: 13,
    K: 12,
    Q: 11,
    T: 10,
    '9': 9,
    '8': 8,
    '7': 7,
    '6': 6,
    '5': 5,
    '4': 4,
    '3': 3,
    '2': 2,
    J: 1
}

let handsData = [];
for (let i = 0; i < 7; i++) handsData[i] = [];

for (let line of lines) {
    const [hand, bid] = line.split(" ");
    let jokers = 0;
    let maxVal;
    const handObj = hand.split("").reduce((acc, curr) => {
        if (curr === "J") jokers++;
        else if (acc[curr]) acc[curr]++;
        else acc[curr] = 1;
        return acc;
    }, {});
    if (!Object.keys(handObj).length) maxVal = jokers;
    else maxVal = Math.max(...Object.values(handObj)) + jokers;
    switch (maxVal) {
        case 5:
            handsData[6].push([hand, bid]);
            break;
        case 4:
            handsData[5].push([hand, bid]);
            break;
        case 3:
            if (Object.keys(handObj).length === 2) handsData[4].push([hand, bid]);
            else handsData[3].push([hand, bid]);
            break;
        case 2:
            if (Object.keys(handObj).length === 3) handsData[2].push([hand, bid]);
            else handsData[1].push([hand, bid]);
            break;
        case 1:
            handsData[0].push([hand, bid]);
    }
}

handsData = handsData.map(h => {
    h.sort((a, b) => {
        let aString = a[0], bString = b[0];
        let diff = 0;
        let index = 0;
        while (!diff && index < aString.length) {
            diff = cardVal[aString[index]] - cardVal[bString[index]];
            index++;
        }
        return diff;
    });
    return h;
});

// console.log(handsData);

handsData = handsData.reduce((acc, curr) => {
    acc.push(...curr);
    return acc;
}, []);

let result = 0;

for (let hand in handsData) result += (parseInt(hand) + 1) * handsData[hand][1];

console.log("The result is : " +result);