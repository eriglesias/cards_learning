//import data from './data/temp.json' with { type: 'json'};
import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./src/data/canonical.json', 'utf8'));
console.log(data)
console.log("Data type", typeof data);
console.log("Is array?", Array.isArray(data));
console.log("Content", data);
console.log(data.cards.verben.eintraege.find(v=> v.id === "verb-geben"))

/* === map test  === */

const map = new Map();
map.set("a", 1);
map.set("b", 2);
map.set("c", 3);
console.log(map.get("a"));
map.set("a",97);
console.log(map.get("a"));
console.log(map.size)
map.delete("b");
console.log(map.size)

/* 
Array.prototype.forEach
Array.prototype.map
Array.prototype.filter
Array.prototype.reduce 
*/

/* == for of test == */

for (const element of data.cards.verben.eintraege) {
    console.log(element)
}

for (const key in data) {
    console.log(key, data[key])
}

for (const key in data){
    if(data.hasOwnProperty(key)){
        console.log(key, data[key])
    }
}

Object.keys(data).forEach(key => {
    console.log(key, data[key]);
})

Object.values(data).forEach(value => {
    console.log(value);
});

for (const [key, value] of Object.entries(data)){
    console.log(key,value)
}

/* == Array Prototype test ** */

data.forEach((element) => console.log(element));

