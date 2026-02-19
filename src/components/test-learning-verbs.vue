
<script setup>

  

    import normalized from '../services/normalize';
    import CardTitle from './card-title.vue';
    import SentenceTemplate from './sentence-template.vue';
    import Answer from './answer.vue';
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { computed } from 'vue'; 
    
    const ok = ref(true);
    const route = useRoute();
    const router = useRouter();
    
    function buildSentenceTemplate(inf) {
        let stem = inf.replace(/en$/, '').replace(/n$/, '')
        return `Ich ${stem}e [?]`
    }

    function giveAnswer(inf) {
        let stem = inf.replace(/en$/, '').replace(/n$/, '')
        return `Ich ${stem}e `
    }
    
   function returnCase() {
        let dativSubject = {
            "ich": "mir",
            "du": "dir",
            "er": "ihm",
            "sie": "ihr",
            "es": "ihm",
            "wir": "uns",
            "ihr": "euch",
            "sie": "ihnen",
            "Sie": "Ihnen"
        }
        const values = Object.values(dativSubject);
        const randomIndex = Math.floor(Math.random() * values.length);
        return values[randomIndex]; 
    }

    const currentIndex = ref(0)
    const isRevealed = ref(false);

    const verbsForThisCase = computed(() => {
        const selectCase = route.params.case
        const ids =  normalized.verbsByCase[selectCase]
        if (!ids) return []
        return Array.from(ids).map(id => normalized.verbsById[id])
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


</script>

<template>
    <div v-if="currentCard">
        <div v-if="!isRevealed" id="op_1">
            <CardTitle :card-title="currentCard.verbInfinitive"/>
            <SentenceTemplate :sentence-template="buildSentenceTemplate(currentCard.verbInfinitive)"/>
            <button @click="reveal"> Show Answer</button>
        </div>
    <div v-else id="op_2">
        <CardTitle :card-title="currentCard.verbInfinitive"/>
        <Answer :answer="giveAnswer(currentCard.verbInfinitive ) + returnCase()"/> 
        <button @click = "next"> Next </button>
    </div>
     </div>
    <div v-else>
        <p>No cards available.</p>
        </div>      
</template>

<style scoped>
    

    #op_1{
        background-color: white;
        padding: 50px;
    }

    #op_2{
        background-color: #000080;
        padding: 50px;
    }

    #op_2 h2 {
        color: #FFCD00;
    }

    div {
        border: 2px solid peru;
        margin-bottom: 10%;
    }

    button {
        background-color: green;
    }

</style>



