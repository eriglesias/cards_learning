

// translation layer if case === "dative" internally map to "dativ"

/* verbs-domain should expose grammar operations, it should not know about exercise, surface, evaluation, distractors 

/*
possible structure
grammar/
verbs
prepostions
conjugation
governance

exercises/
verbCaseProduction
verbCaseRecognition
prepositionCaseProduction

trainer/

ui/
*/


// for each exercise type: select candidates, create exercise, evaluate
// adding a new dimension ExerciseType

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

function createExerciseCore(exerciseType, criteria) {

}

// surface generation

function instantiateSurface(core, exerciseType, config, canonicalData){

}

// evaluation

function evaluate(core, exerciseType, surface, userAnswer){
    
}


function getVerbsByCase(casell){

}

function conjugate(verbId, subject){

}

function getGovernedCase(verbId){


}

