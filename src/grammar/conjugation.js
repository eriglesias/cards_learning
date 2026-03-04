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


// put in the json if the verb is regular or irregular or should it be computed? 

function deriveStem(infinitive){
   if (infinitive.slice(-2) == 'en'){
        return infinitive.slice(2)
   }
}

