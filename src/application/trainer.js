import { ref, computed } from 'vue';
import { createVerbCaseProduction } from '../domain/exercise-factory.js';
import { evaluate } from '../domain/evaluator.js';
import { createInitialCard, computeNextCard, Rating } from '../domain/scheduler.js';
// import from application layer data 


/**
 * 
 * @param {*} verbIds
 * @param {*} targetCase 
 * @param {*} cardRepository object with { loadAll, save, saveAll, clear }
 * @returns 
 */
export function useTrainer(verbIds, targetCase, cardRepository) {
const lastResult = ref(null);
const reviewLog = ref([]);
const isRevealed = ref(false);
const queue = ref([]);
const RATING_MAP = { again: Rating.Again, hard: Rating.Hard, good: Rating.Good, easy: Rating.Easy};
const savedStates = cardRepository.loadAll();
queue.value = verbIds.map(id => {
    const exercise = createVerbCaseProduction(id, targetCase);
    const saved = savedStates[exercise.id];
    return { exercise, fsrsCard: saved ?? createInitialCard() };
});
queue.value.sort((a, b) => a.fsrsCard.due - b.fsrsCard.due )

const isFinished = computed(() => queue.value.length === 0);

const currentExercise = computed(() => queue.value[0]?.exercise ?? null);

function reveal() {
    isRevealed.value = true
}


/**
 * 
 * @param {*} difficulty 
 */
function rate(difficulty) {
    const now = new Date();
    const item = queue.value.shift();
    const nextCard = computeNextCard(item.fsrsCard, RATING_MAP[difficulty], now);
    item.fsrsCard = nextCard;
    cardRepository.save(item.exercise.id, item.fsrsCard);
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

const sessionStats = computed(() => {
    const total = reviewLog.value.length;
    const correct = reviewLog.value.filter(r => r.correct).length;
    return {
        total,
        correct,
        incorrect: total - correct,
        percentage: total > 0 ? Math.round((correct / total) * 100) : 0
    };
});


function checkAnswer(rawAnswer){
   lastResult.value = evaluate(currentExercise.value, rawAnswer);
   isRevealed.value = true;
   return lastResult;
}

function restart() {
    cardRepository.clear();
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