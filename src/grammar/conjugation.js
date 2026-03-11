/*
stem derivation
conjugation logic
case pronoun mapping 
*/


const pronouns = {
    dativ : {
        ich: "mir",
        du: "dir",
        er: "ihm",
        sie: "ihr",
        wir: "uns",
        ihr: "euch",
    },
    accusative: {
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

console.log(pronouns.dativ.ich);

/**
 * gets the stem of a german regular verb
 * @param {string} infinitive 
 * @returns 
 */
function deriveStem(infinitive){
   if (infinitive.slice(-2) == 'en'){
        return infinitive.slice(0, -2)
   }
}

console.log(deriveStem("antworten"));


function applyPhonologicalRules(stem, suffix,  subject) {

    
    if ((stem.endsWith('d') || stem.endsWith('t')) && subject === 'du') {
        suffix = 'est';
    } else if ((stem.endsWith('d') || stem.endsWith('t')) && 
               (subject === 'er' || subject === 'sie' || subject === 'es' || subject === 'ihr')) {
        suffix = 'et';
    } else if ((stem.endsWith('s') || stem.endsWith('ß') || stem.endsWith('x') || stem.endsWith('z')) && 
               (subject === 'du')) {
        suffix = 't';
    }
    
    return suffix;
}

console.log(applyPhonologicalRules("find", "e", "du"));
/**
 * Conjugates a regular german verb in the present tense
 * @param {string} infinitive 
 * @param {string} subject 
 * @returns {string} 
 */

function conjugatePresent(infinitive, subject) {
    let stem = deriveStem(infinitive);
    
    const suffixMap = {
        ich: 'e',
        du: 'st',
        er: 't',
        sie: 't',
        es: 't',
        wir: 'en',
        ihr: 't',
        Sie: 'en'
    };
    const key = subject.trim();
    let suffix = suffixMap[key];
    if (suffix === undefined) {
        console.warn(`Unknown subject "${subject}" returning infinitive.`);
        return infinitive;
    }
    suffix = applyPhonologicalRules(stem, suffix, key);

    return stem + suffix;
}

console.log(conjugatePresent("finden", "ich"));
console.log(conjugatePresent("finden", "du"));
console.log(conjugatePresent("finden", "er"));
console.log(conjugatePresent("finden", "sie"));
console.log(conjugatePresent("finden", "wir"));
console.log(conjugatePresent("finden", "ihr"));
console.log(conjugatePresent("heißen", "ich"));
console.log(conjugatePresent("heißen", "du"));
console.log(conjugatePresent("heißen", "er"));
console.log(conjugatePresent("heißen", "sie"));
console.log(conjugatePresent("heißen", "wir"));
console.log(conjugatePresent("heißen", "ihr"));

/**
 * 
 * @param {string} pcase 
 * @param {string} subject 
 */
function getPronoun(pcase, subject){
//getPronoun("dative", "du") -> "dir"
}