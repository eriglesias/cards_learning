import {createVerbCaseProduction}  from "../src/domain/exercise-factory.js";
import { assertEqual, assertTrue } from "./assert.js";

export function factory_prompt_agreement(){
    const ex = createVerbCaseProduction('verb-danken', 'dativ', {subject: 'du', object: 'er'});
    assertEqual(ex.ui.prompt, 'du dankst ____ (er)');
}

export function factory_different_expected_answers(){
    const ex = createVerbCaseProduction('verb-danken', 'dativ', {subject: 'du', object: 'sie'});
    const ex2 = createVerbCaseProduction('verb-danken', 'dativ', {subject: 'du', object: 'sie_pl'});
    const ex3 = createVerbCaseProduction('verb-danken', 'dativ', {subject: 'du', object: 'Sie_pl'});
    assertEqual(ex.ui.fullSolution, 'du dankst ihr');
    assertEqual(ex2.ui.fullSolution, 'du dankst ihnen');
    assertEqual(ex3.ui.fullSolution, 'du dankst Ihnen');
}

export function factory_validation_person(){
    const ex = createVerbCaseProduction('verb-danken', 'dativ', {subject: 'ich', object: 'er'});
    const ex1 = createVerbCaseProduction('verb-danken', 'dativ', {subject: 'du', object: 'er'});
    const ex2 = createVerbCaseProduction('verb-danken', 'dativ', {subject: 'er', object: 'er'});
    const ex3 = createVerbCaseProduction('verb-danken', 'dativ', {subject: 'wir', object: 'er'});
    const ex4 = createVerbCaseProduction('verb-danken', 'dativ', {subject: 'ihr', object: 'er'});
    const ex5 = createVerbCaseProduction('verb-danken', 'dativ', {subject: 'sie_pl', object: 'er'});
    assertEqual(ex.validation.person, '1sg');
    assertEqual(ex1.validation.person, '2sg');
    assertEqual(ex2.validation.person, '3sg');
    assertEqual(ex3.validation.person, '1pl');
    assertEqual(ex4.validation.person, '2pl');
    assertEqual(ex5.validation.person, '3pl');
}

export function factory_fixed_input(){
    const ex = createVerbCaseProduction('verb-danken', 'dativ', {subject: 'du', object: 'er'});
    const ex1 = createVerbCaseProduction('verb-danken', 'dativ', {subject: 'du', object: 'er'});
    assertTrue(ex.validation.expectedAnswer === ex1.validation.expectedAnswer);
    assertEqual(ex.ui.title, ex1.ui.title);
    assertEqual(ex.ui.fullSolution, ex1.ui.fullSolution);
    assertEqual(ex.validation.targetCase, ex1.validation.targetCase);
    assertEqual(ex.validation.subject, ex1.validation.subject);
    assertEqual(ex.validation.person, ex1.validation.person);
    assertEqual(ex.validation.object, ex1.validation.object);
}

export function factory_return_null(){
    const ex = createVerbCaseProduction('verb-does-not-exist', 'dativ');
    assertEqual(ex, null);
}