import {useTrainer} from '../src/application/trainer.js'
import { assertEqual, assertTrue } from "./assert.js";

export function trainer_check_answer_correct(){
    const trainer = useTrainer(['verb-danken'], 'dativ');
    trainer.checkAnswer('ihm');
    assertTrue(trainer.lastResult.value.correct);
    assertTrue(trainer.isRevealed.value);
}

export function trainer_check_answer_wrong() {
    const trainer = useTrainer(['verb-danken'], 'dativ');
    trainer.checkAnswer('ihn');
    assertTrue(!trainer.lastResult.value.correct);
}

export function trainer_rate_resets_last_result() {
    const trainer = useTrainer(['verb-danken'], 'dativ');
    trainer.checkAnswer('ihm');
    trainer.rate('good');
    assertEqual(trainer.lastResult.value, null);
}