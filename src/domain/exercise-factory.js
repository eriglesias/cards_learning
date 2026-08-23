import { getVerb, conjugate, getCasePronoun, getGovernedCases } from "./verbs-domain.js";


/**
 * Generates a verbCaseProduction exercise object dinamically 
 * @param {string} verbId 
 * @param {string} targetCase (e.g. 'dativ', from route)
 * @param {Object} [options]
 * @param {string} [options.person] ('1sg', '2sg', '3sg', '1pl', '2pl', '3pl')
 * @param {string} [options.objectSubject] ('ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr)
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
    const availableSujects = Object.keys(subjectToConjugationPerson)
    const activeSubject = options.subject || availableSujects[Math.floor(Math.random() * availableSujects.length)]
    const availableObjects = ['ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie_pl', 'Sie_pl']
    const activeObject = options.objectSubject || availableObjects[Math.floor(Math.random() * availableObjects.length)];
    
    const subjectPronoun = getCasePronoun('nominativ', activeSubject || 'ich');
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
            prompt: `${subjectPronoun} ${conjugated} ____ (${objectDisplayLabel}`,
            fullSolution: `${subjectPronoun} ${conjugated} ${expectedAnswer}`
        },
        validation: {
            expectedAnswer: expectedAnswer,
            targetCase: targetCase,
            person: activeSubject,
            objectSubject: activeObject
        }
    };
}