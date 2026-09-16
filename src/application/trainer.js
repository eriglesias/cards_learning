import { ref, computed } from 'vue';
import { createVerbCaseProduction } from '../domain/exercise-factory.js';
import { evaluate } from '../domain/evaluator.js';
import { createInitialCard, computeNextCard, Rating } from '../domain/scheduler.js';
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
const isRevealed = ref(false);
const queue = ref([]);
const RATING_MAP = { again: Rating.Again, hard: Rating.Hard, good: Rating.Good, easy: Rating.Easy};
queue.value = verbIds.map(id => {
    const exercise = createVerbCaseProduction(id, targetCase);
    return { exercise, fsrsCard: createInitialCard() };
});
queue.value.sort((a, b) => a.fsrsCard.due - b.fsrsCard.due )

const isFinished = computed(() => queue.value.length === 0);

const currentExercise = computed(() => queue.value[0]?.exercise ?? null);

function reveal() {
    isRevealed.value = true
}


function rate(difficulty) {
    const now = new Date();
    const item = queue.value.shift();
    const nextCard = computeNextCard(item.fsrsCard, RATING_MAP[difficulty], now);
    item.fsrsCard = nextCard;
    queue.value.push(item);
    queue.value.sort((a, b) => a.fsrsCard.due - b.fsrsCard.due);

    reviewLog.value.push({
        exerciseId: item.exercise.id,
        correct: lastResult.value?.correct ?? null,
        difficulty,
        timestamp: now.getTime()
    });

    lastResult.value = null;
    isRevealed.value = false;
}


function checkAnswer(rawAnswer){
   lastResult.value = evaluate(currentExercise.value, rawAnswer);
   isRevealed.value = true;
   return lastResult;
}

function restart() {
    reviewLog.value = [];
    lastResult.value = null;
    isRevealed.value = false;
    queue.value = verbIds.map(id => ({
        exercise: createVerbCaseProduction(id, targetCase),
        fsrsCard: createInitialCard()
    }));
    queue.value.sort((a, b) => a.fsrsCard.due - b.fsrsCard.due);
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