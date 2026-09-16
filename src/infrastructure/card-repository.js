// Four functions that wrap localStorage to persist FSRS card states. The data shape:

/* 
localStorage key: "cards_learning_states"
value: {
  "ex_verb-danken_dativ_du_er": { },
  "ex_verb-sagen_dativ_ich_sie": {  }
} 
*/

const STORAGE_KEY = 'cards_learning_states';

/**
 * reads all saved states from localStorage
 * @returns {} if nothing is saved or if JSON parsing fails
 */
export function loadAll(){
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
}

/**
 * reads current state, adds/updates one card, writes back.
 * @param {*} exerciseId 
 * @param {*} fsrsCard 
 */
export function save(exerciseId, fsrsCard) {
    const all = loadAll();
    all[exerciseId] = fsrsCard;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

/**
 * replaces all saved states at once (used by restart). Avoid multiple read-write cycles
 * @param {*} states 
 */
export function saveAll(states){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(states));
}

/**
 * removes all saved progress
 */
export function clear() {
    localStorage.removeItem(STORAGE_KEY);
}

export const cardRepository = { loadAll, save, saveAll, clear };