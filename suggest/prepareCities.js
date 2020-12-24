var fs = require("fs");

var contents = fs.readFileSync("./cities.json", "utf8");

var parsed = JSON.parse(contents);

var cities = [];
for (let key in parsed) {
  cities.push(parsed[key]);
}

var f = cities.flat();

var arr = [];

f.forEach((el, index) => {
  if (!arr.includes(el)) {
    arr.push(el);
  }
});

var JsonStr = JSON.stringify(arr, null, " ");

console.log(fs.writeFileSync("newJSON.json", JsonStr));
