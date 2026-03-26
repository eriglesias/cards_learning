
/*import normalized from '../data/normalize';
let verbObject = normalized.verbsById;*/

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

console.log(verbObject['verb-geben'].conjugation.present['2sg'])

const suffixMap = {
        '1sg': 'e',
        '2sg': 'st',
        '3sg': 't',
        '1pl': 'en',
        '2pl': 't',
        '3pl': 'en'
    };

const pronouns = {
    dativ : {
        ich: "mir",
        du: "dir",
        er: "ihm",
        sie: "ihr",
        wir: "uns",
        ihr: "euch",
    },
    accusativ: {
        ich: "mich",
        du: "dich",
        er: "ihn",
        sie: "sie",
        es: "es",
        wir: "uns",
        ihr: "euch",
        Sie: "sie"
    }
};

//console.log(pronouns.dativ.ich);

/**
 * Gets the pronoun according to the grammatical case.
 * @param {string} pcase 
 * @param {string} subject 
 */

function getPronoun(pcase, subject){
    if (pcase in pronouns && subject in pronouns[pcase]){
        return pronouns[pcase][subject];
    }
    return undefined;
}


console.log(getPronoun("dativ", "ich"))

/**
 * gets the stem of a german regular verb
 * @param {string} infinitive 
 * @returns 
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

console.log(deriveStem("antworten"));
console.log(deriveStem("handeln"));
console.log(deriveStem("wandern"));

/**
 * 
 * @param {*} verbOject 
 * @param {*} person 
 * @returns 
 */
function applyIrregularOverrides(verbOject, person) {
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
    
    return null;
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
        //suffix = applyPhonologicalRules(stem,key);
        console.log(suffix);
        return stem + suffix;
    }   
}

console.log(conjugatePresent(verbObject['verb-antworten'], "1sg"));
console.log(conjugatePresent(verbObject['verb-geben'], "2sg"));



