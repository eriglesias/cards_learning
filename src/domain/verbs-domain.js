

// translation layer if case === "dative" internally map to "dativ"


getExerciseCores(criteria)
evaluate(core, userAnswer, config)

/* function returnCase() {
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
}
*/

// at creation time -> choose verb, choose subject -> derive correct object from subject -> free that inside exercise

// fetch verbs
function selectVerbs(criteria, normalized) {
    return normalized.verbsByCase[criteria.base]
}

// create core

function createExerciseCore(verb, criteria) {

}

// surface generation

function instantiateSurface(core, config, canonicalData){

}

// evaluation

function evaluate(core, surface, userAnswer){
    
}