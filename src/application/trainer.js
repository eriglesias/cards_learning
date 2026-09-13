import { ref, computed } from 'vue';
import { createVerbCaseProduction } from '../domain/exercise-factory.js';
import { evaluate } from '../domain/evaluator.js';
// import from application layer data 


/**
 * 
 * @param {*} verbIds
 * @param {*} targetCase 
 * @returns 
 */
export function useTrainer(verbIds, targetCase) {
const lastResult = ref(null);
const reviewLog = ref([]);
const currentIndex = ref(0)
const isRevealed = ref(false);

const isFinished = computed (() => {
    return currentIndex.value >= verbIds.length
})


const exercises = verbIds.map(id => createVerbCaseProduction(id, targetCase))

const currentExercise = computed(() => {
    return exercises[currentIndex.value]
})


function reveal() {
    isRevealed.value = true
}


function rate(difficulty) {
    reviewLog.value.push({
        exerciseId: currentExercise.value.id,
        correct: lastResult.value?.correct ?? null,
        difficulty,
        timestamp: Date.now()
    });
    currentIndex.value++
    lastResult.value = null;
    isRevealed.value = false
}


function checkAnswer(rawAnswer){
   lastResult.value = evaluate(currentExercise.value, rawAnswer);
   isRevealed.value = true;
   return lastResult;
}



function restart() {
    reviewLog.value = [];
    lastResult.value = null;
    currentIndex.value = 0
    isRevealed.value = false
}


return {
    currentExercise,
    isFinished,
    reveal,
    isRevealed,
    rate,
    checkAnswer,
    lastResult,
    reviewLog,
    restart
} 

}