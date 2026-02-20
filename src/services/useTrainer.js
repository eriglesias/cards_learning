import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import normalized from './normalize';

export function useTrainer() {

const currentIndex = ref(0)
const isRevealed = ref(false);
const route = useRoute()

const verbsForThisCase = computed(() => {
    const selectCase = route.params.case
    const ids =  normalized.verbsByCase[selectCase]
    if (!ids) return []
    return Array.from(ids).map(id => normalized.verbsById[id])
})

const isFinished = computed (() => {
    return currentIndex.value >= verbsForThisCase.value.length
})

const currentCard = computed(() => {
    return verbsForThisCase.value[currentIndex.value]
})
 
function reveal() {
    isRevealed.value = true
}

function next() {
    currentIndex.value++
    isRevealed.value = false
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
    next,
    restart
} 

}