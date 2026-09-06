import { ref, computed } from 'vue';
import { createVerbCaseProduction } from '../domain/exercise-factory.js';
// import from application layer data 

/**
 * 
 * @param {*} verbIds
 * @param {*} targetCase 
 * @returns 
 */
export function useTrainer(verbIds, targetCase) {

    
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
    currentIndex.value++
    isRevealed.value = false
    if (difficulty == "hard") {
        /* something happens */
    }
}


function restart() {
    currentIndex.value = 0
    isRevealed.value = false
}


return {
    
    currentExercise,
    isFinished,
    reveal,
    isRevealed,
    rate,
    restart
} 

}