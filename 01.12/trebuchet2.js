const fs = require("fs");

const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");
let result = lines.reduce((acc, curr) => {
    let first = -1;
    let last = -1;
    let firstIndex = Number.MAX_SAFE_INTEGER;
    let lastIndex = -1;
    for (let num in numbers) {
        const firstOcc = curr.indexOf(numbers[num]);
        const lastOcc = curr.lastIndexOf(numbers[num]);
        if (firstOcc > -1 && firstOcc < firstIndex) {
            first = num;
            firstIndex = firstOcc;
        }
        if (lastOcc > lastIndex) {
            last = num;
            lastIndex = lastOcc;
        }
    }
    const nums = curr.replace(/\D/g, '');
    for (let num of nums) {
        const firstOcc = curr.indexOf(num);
        const lastOcc = curr.lastIndexOf(num);
        if (firstOcc > -1 && firstOcc < firstIndex) {
            first = num;
            firstIndex = firstOcc;
        };
        if (lastOcc > lastIndex) {
            last = num;
            lastIndex = lastOcc;
        }
    }
    let value = first.toString() +last.toString();
    console.log(value);
    acc += parseInt(value);
    return acc;
}, 0);

console.log("The result is: " +result);