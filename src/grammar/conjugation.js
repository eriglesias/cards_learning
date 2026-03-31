
import normalized from '../data/normalize';
let verbObject = normalized.verbsById;


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
 * Returns the irregular present tense conjugation for a verb if an override exists.
 * @param {*} verbOject a normalized verb data object 
 * @param {*} person the grammatical person in shorthand notation '1sg','1pl', etc
 * @returns {string|undefined} the irregular conjugated from, or undefined if no override exists.
 * @example
 * applyIrregularOverrides(verbData['verb-geben'], '2sg'); // returns 'gibst'
 * applyIrregularOverrides(verbData['verb-geben'], '2sg'); // returns undefined (no override)
 */
function applyIrregularOverrides(verbObject, person) {
    if (present in verbObject.conjugation){
        if (person in verbObject.conjugation.present){
            return verbObject.conjugation.present.person;
        }
    } else {
        return undefined;
    }
}


/**
 * Adjusts a verb suffix based on German phonological rules.
 * Falls back to the standar suffix from suffixMap if no special rules applies.
 * @param {string} stem the calculated stem of a german verb gotten from deriveStem
 * @param {string} person the grammatical person in shorthand notation '1sg','1pl', etc
 * @returns  {string} the adjusted suffix with any necessary vowel instertions applied
 * @example applyPhonologicalRules()
 * applyPhonologicalRules('arbeit', '2sg'); // returns 'est'
 * applyPhonologicalRules('reis',   '2sg'); // returns 't' 
 */
function applyPhonologicalRules(stem, person) {
    
    if ((stem.endsWith('d') || stem.endsWith('t')) && person === '2sg') {
        return 'est';
    } else if ((stem.endsWith('d') || stem.endsWith('t')) && 
               (person === '2sg' || person === '2pl')) {
        return 'et';
    } else if ((stem.endsWith('s') || stem.endsWith('ß') || stem.endsWith('x') || stem.endsWith('z')) && 
               (person === '2sg')) {
        return 't';
    } 
    
    return suffixMap[person];
}


/**
 * Conjugates a regular german verb in the present tense for a given grammatical person.
 * If the verb object contains an explicit conjugation, that entry is returned directly (irregular).
 * Otherwise the form is built deriving the stem from the infinitive and appending the suffix produced by applyPhonologicalRules().
 * @param {string} infinitive  a normalized verb data object 
 * @param {string} person the grammatical person in shorthand notation '1sg', '1pl'
 * @returns {string} the german verb conjugated for that person 
 * @example
 * conjugatePresent(verbData['verb-machen'], '1sg'); // returns 'mache'
 * conjugatePresent(verbData['verb-geben'],  '2sg'); // returns 'gibst' 
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

export function getPronoun() {};
export function conjugatePresent() {};




