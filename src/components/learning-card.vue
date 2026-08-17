
<script setup>

    import { getVerb , conjugate, getVerbsByCase, getVerbArguments, getGovernedCases } from '../domain/verbs-domain.js';
    import CardTitle from './card-title.vue';
    import SentenceTemplate from './sentence-template.vue';
    import Answer from './answer.vue';
    import { ref } from 'vue';
    import { computed } from 'vue'; 
    
    const ok = ref(true);
  
    

    /*
    possible future structure?
    grammar/
    conjugation.js
    domain/
    verbs-domain.js
    trainer/
    sentence-builder.js
    exercise-generator.js
    ui/
    LearningCard.vue    
    */

    /* function buildSentenceTemplate(inf) {
        let stem = inf.replace(/en$/, '').replace(/n$/, '')
        return `Ich ${stem}e [?]`
    }

    function giveAnswer(inf) {
        let stem = inf.replace(/en$/, '').replace(/n$/, '')
        return `Ich ${stem}e `
    }
    */


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


</script>

<template>
    <template v-for="card in verbsForThisCase"
        :key="card.id"
    >
        <template v-if="ok">
            <div id="op_1">
                <CardTitle :card-title="card.verbInfinitive"/>
                <SentenceTemplate :sentence-template="buildSentenceTemplate(card.verbInfinitive)"/>
            </div>
        </template>
    <template v-else>
        <div id="op_2">
            <CardTitle :card-title="card.verbInfinitive"/>
            <Answer :answer="giveAnswer(card.verbInfinitive ) + returnCase()"/> 
        </div>
    </template>
    <button @click="ok = !ok">show</button>
    </template>
    
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


