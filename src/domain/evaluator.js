
// input Sanitization / Normalization
// success evaluation
// diagnostic error feedback


/**
 * Compares (evaluate) the exercise template with the user answer 
 * @param {*} exercise 
 * @param {*} userAnswer 
 */
export function evaluate(exercise, userAnswer){
    let normalized = userAnswer.trim();
    let expected = exercise.validation.expectedAnswer;
    const correct = normalized === expected;
    return { correct, normalized, expected };
    
}



