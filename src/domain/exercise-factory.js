import { getVerb, conjugate, getCasePronoun, getGovernedCases } from "./verbs-domain.js";
import { getPreposition, getPrepositionsByCase  } from "./prepositions-domain.js";


function generateDistractors(targetCase, object) {

}

function shuffle(array){
    const a = [...array];
    
}

// check if getGovernedCases not necessary after ui and route import test
/**
 * Generates a verbCaseProduction exercise object dinamically 
 * @param {string} verbId 
 * @param {string} targetCase (e.g. 'dativ', from route)
 * @param {Object} [options]
 * @param {string} [options.object] ('ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr)
 */
export function createVerbCaseProduction(verbId, targetCase, options = {}) {
    const verb = getVerb(verbId);
    if (!verb) return null;
    const subjectToConjugationPerson = {
        'ich': '1sg',
        'du': '2sg',
        'er': '3sg',
        'sie': '3sg',       
        'es': '3sg',        
        'wir': '1pl',
        'ihr': '2pl',
        'sie_pl': '3pl',    
        'Sie_pl': '3pl'    
    };
    const availableSubjects = Object.keys(subjectToConjugationPerson)
    const activeSubject = options.subject || availableSubjects[Math.floor(Math.random() * availableSubjects.length)]
    const availableObjects = ['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie_pl', 'Sie_pl']
    const activeObject = options.object || availableObjects[Math.floor(Math.random() * availableObjects.length)];
    
    const subjectPronoun = getCasePronoun('nominativ', activeSubject);
    const conjugated = conjugate(verbId, subjectToConjugationPerson[activeSubject]);
    const expectedAnswer = getCasePronoun(targetCase, activeObject);
    const objectDisplayLabel = activeObject === 'sie_pl' ? 'sie (pl)': activeObject === 'Sie_pl' ? 'Sie' : activeObject;
    return {
        id: `ex_${verbId}_${targetCase}_${activeSubject}_${activeObject}`,
        type: 'verbCaseProduction',
        skillId: `case_governance:${targetCase}`,
        itemId: `verb:${verbId}`,
        ui: {
            title: verb.verbInfinitive,
            prompt: `${subjectPronoun} ${conjugated} ____ (${objectDisplayLabel})`,
            fullSolution: `${subjectPronoun} ${conjugated} ${expectedAnswer}`
        },
        validation: {
            expectedAnswer: expectedAnswer,
            targetCase: targetCase,
            subject: activeSubject,
            person: subjectToConjugationPerson[activeSubject],
            object: activeObject
        }
    };
}

/**
 * 
 * @param {*} verbId 
 * @returns 
 */
export function createVerbGovernance(verbId) {
    const verb = getVerb(verbId);
    if(!verb) return null;
    const cases = getGovernedCases(verbId);
    return {
        id: `gov_${verbId}`,
        type: 'verbGovernance',
        ui: {
            title: verb.verbInfinitive,
            prompt: `Which case does "${verb.verbInfinitive}" govern?`
        },
        validation: {
            expectedAnswer: cases[0],
            validAnswers: cases
        }
    };
}

/**
 * 
 * @param {*} prepositionId 
 * @returns 
 */
export function createPrepositionCase(prepositionId){
    const prep = getPreposition(prepositionId);
    if(!prep) return null;
    return {
        id: `prep_${prepositionId}`,
        type: 'prepositionCase',
        ui: {
            title: prep.preposition,
            prompt: `Which case does "${prep.preposition}" govern?`
        },
        validation: {
            expectedAnswer: prep.allowedCases[0],
            validAnswers: prep.allowedCases
        }
    };
}