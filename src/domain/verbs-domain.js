// what grammar operations exist
// verbs-domain.js imports normalize and conjugation wires them together
import normalized from "../data/normalize.js";
import { conjugatePresent, getPronoun } from "../grammar/conjugation.js";

// verbs-domain should expose grammar operations, it should not know about exercise, surface, evaluation, distractors 
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

// at creation time -> choose verb, choose subject -> derive correct object from subject -> free that inside exercise

/*  Goes to scheduler 
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
*/

const caseMap = {
    nominativ: "nominativ", nominative: "nominativ", 
    dativ: "dativ", dative: "dativ",
    akkusativ: "akkusativ", accusative: "akkusativ",
    genitiv: "genitiv", genitive: "genitiv"
}




// Data access layer (read-only)

/**
 * retrieve canonical verb object
 * @param {*} id 
 * @returns 
 */
function getVerb(id){
    
    if (normalized.verbsById[id] != null) {
        return normalized.verbsById[id];
    }else {
        return null;
    }
}

/**
 * 
 * @param {*} input 
 * @returns 
 */
function normalizeCase(input){
    return caseMap[input] ?? null
}


/**
 * return a set  of verbIds or verbObjects grouped by grammatical case
 * return an object 
 * @param {*} verb_case 
 */
function getVerbsByCase(verbCase){
 // I have an object with 3 sets that are being exported from normalize as verbsByCase 
    const internal = normalizeCase(verbCase);
    const ids = normalized.verbsByCase[internal];
    // ... makes an array from a set
    return ids ? [...ids] : null;
}

// Semantic query layer
// would be the primary API? 
/**
 * 
 * @param {*} verbId 
 * @returns 
 */
function getVerbArguments(verbId){
    if (normalized.verbsById[verbId] != null) {
        return normalized.verbsById[verbId].arguments;
    }else {
        return null;
    }
}

/**
 * 
 * @param {*} verbId 
 * example danken -> dativ
 * sehen -> accusative
 * if multiple arguments exist, define rule: primary argument or return array
 * should this function gurantee uniqueness?
 */
function getGovernedCases(verbId){
    let verbArgs = getVerbArguments(verbId);
    if (verbArgs  == null) {
        return null
    } else {
        return verbArgs.map(arg => arg.case)
    }
}


// Grammar delegation layer

/**
 * getVerbById pass to conjugation.js and return final string
 * @param {*} verbId 
 * @param {*} person 
 */
function conjugate(verbId, person){
    return conjugatePresent(getVerb(verbId), person)
}

// getPronoun(case, subject) if ui needss it often expose here otherwise keep in conjugation.js 
// getLearningCandidates(criteria): filter verbs for learning mode
// sampleVerb(case): returns random verb matching case 


export { getVerb , conjugate, getVerbsByCase, getVerbArguments, getGovernedCases};
