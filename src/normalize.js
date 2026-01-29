//import data from './data/temp.json' with { type: 'json'};
import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./src/data/canonical.json', 'utf8'));
console.log(data)


console.log("Data type", typeof data);
console.log("Is array?", Array.isArray(data));
console.log("Content", data);


console.log(data.cards.verben.eintraege.find(v=> v.id === "verb-geben"))

/* === TEST === */

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

