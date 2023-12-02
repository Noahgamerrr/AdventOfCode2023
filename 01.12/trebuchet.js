const fs = require("fs");

const input = fs.readFileSync("./input.txt").toString();
const lines = input.split("\r\n");
let result = lines.reduce((acc, curr) => {
    const nums = curr.replace(/\D/g, '');
    let value = nums[0] + nums[nums.length - 1];
    acc += parseInt(value);
    return acc;
}, 0);

console.log("The result is: " +result);