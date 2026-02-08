//import data from './data/temp.json' with { type: 'json'}; -- Quokka error free version
//import fs from 'fs';
//const data = JSON.parse(fs.readFileSync('./src/data/canonical.json', 'utf8'));
//import { normalize } from 'path';
import data from '../data/canonical.json'  with {type: 'json'};
/*console.log(data)
console.log("Data type", typeof data);
console.log("Is array?", Array.isArray(data));
console.log("Content", data);
console.log(data.cards.verben.eintraege.find(v=> v.id === "verb-geben"))*/

/* === map test  === */

/*const map = new Map();
map.set("a", 1);
map.set("b", 2);
map.set("c", 3);
console.log(map.get("a"));
map.set("a",97);
console.log(map.get("a"));
console.log(map.size)
map.delete("b");
console.log(map.size)*/

/* 
Array.prototype.filter
Array.prototype.reduce 
*/

/* == for of test == */

/*for (const element of data.cards.verben.eintraege) {
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
}*/

/* == Array Prototype test == ** */

//data.cards.verben.eintraege.forEach((element) => console.log(element));

/*console.log(data);
console.log(data.cards)
console.log(data.cards.verben)
console.log(data.cards.verben.eintraege)*/

/*const filterTest = eintraege.filter((verb) => verb.subjectRole == 'agent');
console.log(filterTest)*/

//const dativVerbs = eintraege.filter((verb) => verb.arguments.some(arg => arg.case === 'dativ'));
//console.log(dativVerbs);

/* == Normalization test == */

// keys = cases
// values = list of verb IDs
// uniqueness

/*console.log(eintraege[0].id)
console.log(eintraege[0].arguments[0].case)*/

/* Normalization */

const eintraege = data.cards.verben.eintraege


const  verbsByCase = {
     dativ : new Set(),
     akkusativ : new Set(),
     genitiv: new Set()
};

const verbsById = { }

for (const element of eintraege) {
    for (const argument of element.arguments) {
        if (argument.case == 'dativ') {
            verbsByCase.dativ.add(element.id)
        }
        else if (argument.case == 'akkusativ') {
             verbsByCase.akkusativ.add(element.id)
        }
        else if (argument.case == 'genitive') {
             verbsByCase.genitiv.add(element.id)
        }
    }
}


for (const element of eintraege) {
    //console.log(element)
    verbsById[element.id] = element;
}

console.log(verbsByCase);
console.log(verbsById)

const normalized = {
  verbsById,
  verbsByCase,
}

export default normalized;