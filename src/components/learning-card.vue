
<script setup>
    import cards from '../data/card.json';
    import CardTitle from './card-title.vue';
    import SentenceTemplate from './sentence-template.vue';
    import Answer from './answer.vue';
    import { ref } from 'vue';

    const ok = ref(true);

    function buildSentenceTemplate(inf) {
        let stem = inf.replace(/en$/, '').replace(/n$/, '')
        return `Ich ${stem}e [?]`
    }

    function giveAnswer(inf) {
        let stem = inf.replace(/en$/, '').replace(/n$/, '')
        return `Ich ${stem}e`
    }

</script>

<template>
    <template v-for="card in cards">
        <template v-if="ok">
    <div id="op_1">
        <CardTitle :card-title="card.verbInfinitive"/>
        <!--<SentenceTemplate :sentence-template="buildSentenceTemplate(card.verbInfinitive)"/>-->
        <SentenceTemplate :sentence-template="card.sentenceTemplate"/>
    </div>
    </template>
    <template v-else>
        <div id="op_2">
            <CardTitle :card-title="card.verbInfinitive"/>
            <Answer :answer="giveAnswer(card.verbInfinitive ) +( card.answer)"/> + <span> test</span>
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