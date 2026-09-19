import {useTrainer} from '../src/application/trainer.js'
import { assertEqual, assertTrue } from "./assert.js";
import { createVerbCaseProduction } from '../src/domain/exercise-factory.js';

const mockRepo = { loadAll: () => ({}), save: () => {}, saveAll: () => {}, clear: () => {} };
const exercises = [createVerbCaseProduction('verb-danken', 'dativ')];
const trainer = useTrainer(exercises, mockRepo);

export function trainer_check_answer_correct(){
    const exercises = [createVerbCaseProduction('verb-danken', 'dativ')];
    const trainer = useTrainer(exercises, mockRepo);
    const answer = trainer.currentExercise.value.validation.expectedAnswer;
    trainer.checkAnswer(answer);
    assertTrue(trainer.lastResult.value.correct);
    assertTrue(trainer.isRevealed.value);
}

export function trainer_check_answer_wrong() {
    const exercises = [createVerbCaseProduction('verb-danken', 'dativ')];
    const trainer = useTrainer(exercises, mockRepo);
    trainer.checkAnswer('ihn');
    assertTrue(!trainer.lastResult.value.correct);
}

export function trainer_rate_resets_last_result() {
    const exercises = [createVerbCaseProduction('verb-danken', 'dativ')];
    const trainer = useTrainer(exercises, mockRepo);
    trainer.checkAnswer('ihm');
    trainer.rate('good');
    assertEqual(trainer.lastResult.value, null);
}

export function trainer_rate_records_result() {
    const exercises = [createVerbCaseProduction('verb-danken', 'dativ')];
    const trainer = useTrainer(exercises, mockRepo);
    const answer = trainer.currentExercise.value.validation.expectedAnswer;
    trainer.checkAnswer(answer);
    trainer.rate('good');
    assertEqual(trainer.reviewLog.value.length, 1);
    assertTrue(trainer.reviewLog.value[0].correct);
    assertEqual(trainer.reviewLog.value[0].difficulty, 'good');
}

export function trainer_persists_card_state() {
    const store = {};
    const repo = {
        loadAll: () => ({ ...store }),
        save: (id, state) => { store[id] = state; },
        saveAll: () => {},
        clear: () => { Object.keys(store).forEach(k => delete store[k]); }
    };
    const exercises = [createVerbCaseProduction('verb-danken', 'dativ')];
    const trainer = useTrainer(exercises, repo);
    const answer = trainer.currentExercise.value.validation.expectedAnswer;
    trainer.checkAnswer(answer);
    trainer.rate('good');
    const saved = repo.loadAll();
    assertTrue(Object.keys(saved).length > 0);
}

