/*
stem derivation
conjugation logic
case pronoun mapping 
*/


/* 
grammar/
conjugation
caseMapping
governance
*/

/*function buildSentenceTemplate(inf) {
    let stem = inf.replace(/en$/, '').replace(/n$/, '')
    return `Ich ${stem}e [?]`
}

function giveAnswer(inf) {
    let stem = inf.replace(/en$/, '').replace(/n$/, '')
    return `Ich ${stem}e `
}

function returnCase() {
    let dativSubject = {
        "ich": "mir",
        "du": "dir",
        "er": "ihm",
        "sie": "ihr",
        "es": "ihm",
        "wir": "uns",
        "ihr": "euch",
        "sie": "ihnen",
        "Sie": "Ihnen"
    }
    const values = Object.values(dativSubject);
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex]; 
}*/

/* 
grammar must provide
deriveStem(infinitive)
conjugatePresent(infinite, subject)
getPronoun(case, subject)

no randomness, no templates, no sentence formatting 
*/


// put in the json if the verb is regular or irregular or should it be computed? 

const pronouns = {
    dativ : {
        ich: "mir",
        du: "dir",
        er: "ihm",
        sie: "ihr",
        wir: "uns",
        ihr: "euch",
    }
};

console.log(pronouns.dativ.ich);

function deriveStem(infinitive){
   if (infinitive.slice(-2) == 'en'){
        return infinitive.slice(0, -2)
   }
}

console.log(deriveStem("antworten"));

/**
 * Conjugates a regular german verb in the present tense
 * @param {string} infinitive 
 * @param {string} subject 
 * @returns {string} 
 */

function conjugatePresent(infinitive, subject) {
    let stem = deriveStem(infinitive);
    if (stem.endsWith("d") || stem.endsWith("t")){
        const suffixMap = {
        ich: 'e',
        du: 'est',
        er: 'et',
        sie: 'et',
        es: 'et',
        wir: 'en',
        ihr: 'et',
        Sie: 'en'
    };
    }else {
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
    }
    
    

    const key = subject.trim();
    const suffix = suffixMap[key];
    if (suffix === undefined) {
        console.warn(`Unknown subject "${subject}" returning infinitive.`);
        return infinitive;
    }
    return stem + suffix;
}

console.log(conjugatePresent("lernen", "ich"));
console.log(conjugatePresent("lernen", "du"));
console.log(conjugatePresent("lernen", "er"));
console.log(conjugatePresent("lernen", "sie"));
console.log(conjugatePresent("lernen", "wir"));
console.log(conjugatePresent("lernen", "ihr"));
console.log(conjugatePresent("finden", "er"));

function getPronoun(pcase, subject){
//getPronoun("dative", "du") -> "dir"
}