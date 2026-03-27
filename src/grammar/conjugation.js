
/*import normalized from '../data/normalize';
let verbObject = normalized.verbsById;*/

import { log } from 'console';
import fs from 'fs'
const rawData = JSON.parse(fs.readFileSync('./src/data/canonical.json', 'utf8'));
const eintraege = rawData.cards.verben.eintraege;

const verbsByCase = { dative: new Set(), accusative: new Set(), genitive: new Set() };
const verbsById = {};

for (const element of eintraege) {
  for (const argument of element.arguments) {
    if (argument.case === 'dativ') verbsByCase.dative.add(element.id);
    else if (argument.case === 'akkusativ') verbsByCase.accusative.add(element.id);
    else if (argument.case === 'genitive') verbsByCase.genitive.add(element.id);
  }
  verbsById[element.id] = element;
}

const normalized = { verbsById, verbsByCase };
let verbObject = normalized.verbsById;

//console.log(verbObject);
//console.log(verbObject['verb-antworten']);
//console.log(verbObject['verb-antworten'].verbInfinitive);
//console.log(verbObject['verb-geben'].conjugation.present['2sg'])

const suffixMap = {
        '1sg': 'e',
        '2sg': 'st',
        '3sg': 't',
        '1pl': 'en',
        '2pl': 't',
        '3pl': 'en'
    };

const pronouns = {
    nominativ: {
        ich: "ich",
        du: "du",
        er: "er",
        sie: "sie",
        es: "ihm",
        wir: "uns",
        ihr: "ihr",
        sie_pl: "sie",
        Sie_pl: "Sie"
    },
    dativ : {
        ich: "mir",
        du: "dir",
        er: "ihm",
        sie: "ihr",
        es: "ihm",
        wir: "uns",
        ihr: "euch",
        sie_pl: "ihnen",
        Sie_pl: "Ihnen",
    },
    accusativ: {
        ich: "mich",
        du: "dich",
        er: "ihn",
        sie: "sie",
        es: "es",
        wir: "uns",
        ihr: "euch",
        sie_pl: "sie",
        Sie_pl: "sie"
    },
    genitiv: {
        ich: "meiner",
        du: "deiner",
        er: "seiner",
        sie: "ihrer",
        es: "seiner",
        wir: "unser",
        ihr: "euer",
        sie_pl: "ihrer",
        Sie_pl: "Ihrer"
    }
};



/**
 * Gets the personal pronoun according to the grammatical case.
 * @param {string} pcase the grammatical case
 * @param {string} subject the pronoun subject 
 * @returns {string|undefined} the corresponding pronoun, or undefined if not found 
 * @example
 * getPronoun('dativ', 'ich'); // returns 'mir'
 * getPronoun('genitiv', 'lhrgl'); // returns undefined
 */

function getPronoun(pcase, subject){
    if (pcase in pronouns && subject in pronouns[pcase]){
        return pronouns[pcase][subject];
    }
    return undefined;
}


/**
 * gets the stem of a german regular verb
 * @param {string} verbInfinitive 
 * @returns {string|undefined} the stem of the corresponding verb, or undefined if the ending is not recognized 
 * @example
 * deriveStem('machen'); // returns 'mach'
 * deriveStem('sammeln'); // returns 'sammel'
 */
function deriveStem(verbInfinitive){
   if (verbInfinitive.slice(-3) == 'eln'){
        return (verbInfinitive.slice(0, -3))
   }else if (verbInfinitive.slice(-2) == 'en'){
        return verbInfinitive.slice(0, -2)
   }  else if (verbInfinitive.slice(-1) == 'n') {
    return (verbInfinitive.slice(0, -1))
   }
}


/**
 * checks in the object from normalized data if the verb has an irregular conjugation and returns in according to the subject
 * @param {*} verbOject 
 * @param {*} person 
 * @returns {string|undefined}
 */
function applyIrregularOverrides(verbObject, person) {
    console.log(verbObject['verb-geben'].conjugation.present)
    if (present in verbObject.conjugation){
        if (person in verbObject.conjugation.present){
            return verbObject.conjugation.present.person;
        }
    } else {
        return verbObject;
    }
}

/**
 * Adjusts a verb suffix based on German phonological rules.
 * @param {string} stem the calculated stem of a german verb gotten from deriveStem
 * @param {string} subject 
 * @returns  {string} the adjusted suffix with any necessary vowel instertions applied
 */
function applyPhonologicalRules(stem, person) {
    
    if ((stem.endsWith('d') || stem.endsWith('t')) && person === '2sg') {
        return 'est';
    } else if ((stem.endsWith('d') || stem.endsWith('t')) && 
               (person === 'er' || person === 'sie' || person === 'es' || person === 'ihr')) {
        return 'et';
    } else if ((stem.endsWith('s') || stem.endsWith('ß') || stem.endsWith('x') || stem.endsWith('z')) && 
               (person === 'du')) {
        return 't';
    } 
    
    return suffixMap[person];
}

console.log(applyPhonologicalRules("find", "2sg"));
console.log(applyPhonologicalRules('antwort', '1sg'));
/**
 * Conjugates a regular german verb in the present tense
 * @param {string} infinitive 
 * @param {string} person 
 * @returns {string} 
 */

function conjugatePresent(verbObject,person) {
    if (verbObject.conjugation!=null) {
        if(person in verbObject.conjugation.present) {
            return verbObject.conjugation.present[person];
        }
    } else {
        let infinitive = verbObject.verbInfinitive;
        console.log(infinitive);
        let stem = deriveStem(infinitive);
        console.log(stem);
        const key = person.trim();
        console.log(key);
        let suffix = suffixMap[key];
        console.log(suffix);
        if (suffix === undefined) {
            console.warn(`Unknown subject "${person}" returning infinitive.`);
            return infinitive;
        }
        suffix = applyPhonologicalRules(stem,key);
        console.log(suffix);
        return stem + suffix;
    }   
}

console.log(conjugatePresent(verbObject['verb-antworten'], "1sg"));
console.log(conjugatePresent(verbObject['verb-geben'], "2sg"));



