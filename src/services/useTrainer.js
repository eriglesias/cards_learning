import { ref, computed } from 'vue';
// import from application layer data 

export function useTrainer() {

    
const currentIndex = ref(0)
const isRevealed = ref(false);
function useTrainer(cards) {

}


const isFinished = computed (() => {
    return currentIndex.value >= verbsForThisCase.value.length
})


const currentCard = computed(() => {
    return verbsForThisCase.value[currentIndex.value]
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
    
    currentCard,
    isFinished,
    isRevealed,
    reveal,
    rate,
    restart
} 

}