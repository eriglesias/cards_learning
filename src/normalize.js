//import data from './data/temp.json' with { type: 'json'};
import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./src/data/canonical.json', 'utf8'));
console.log(data)


console.log("Data type", typeof data);
console.log("Is array?", Array.isArray(data));
console.log("Content", data);

