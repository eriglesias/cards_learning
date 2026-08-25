import { createVerbCaseProduction } from "../src/domain/exercise-factory.js";
import { evaluate } from "../src/domain/evaluator.js";
import { assertEqual, assertTrue } from "./assert.js";

export function evaluator_correct_answer() {
    const ex = createVerbCaseProduction('verb-danken', 'dativ', { subject: 'du', object: 'er' });
    const result = evaluate(ex, 'ihm');
    assertTrue(result.correct);
    assertEqual(result.normalized, 'ihm');
}

export function evaluator_wrong_answer() {
    const ex = createVerbCaseProduction('verb-danken', 'dativ', { subject: 'du', object: 'er' });
    const result = evaluate(ex, 'ihn');
    assertTrue(!result.correct);
}

export function evaluator_trim_spaces() {
    const ex = createVerbCaseProduction('verb-danken', 'dativ', { subject: 'du', object: 'er' });
    const result = evaluate(ex, '  ihm  ');
    assertTrue(result.correct);
    assertEqual(result.normalized, 'ihm');
}

export function evaluator_case_sensitive_Sie_pl() {
    const ex = createVerbCaseProduction('verb-danken', 'dativ', { subject: 'du', object: 'Sie_pl' });
    const result = evaluate(ex, 'Ihnen');
    assertTrue(result.correct);
    
    const wrongCase = evaluate(ex, 'ihnen');
    assertTrue(!wrongCase.correct);  // deliberately wrong — case matters
}