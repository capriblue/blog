const test = require("./test.json")
console.log(test)

const fs = require("fs")

const data = JSON.parse(fs.readFileSync("./data.json", 'utf-8'))

for (const key in data) {
    console.log(key, data[key])
}