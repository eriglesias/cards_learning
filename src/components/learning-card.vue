
<script setup>
    import card from '../data/card.json';
    import CardTitle from './card-title.vue';
    import SentenceTemplate from './sentence-template.vue';
    import Answer from './answer.vue';
    import { ref } from 'vue';

    const ok = ref(true);
</script>

<template>
    <template v-if="ok">
    <div id="op_1">
        <CardTitle :card-title="card.verbInfinitive"/>
        <SentenceTemplate :sentence-template="card.sentenceTemplate"/>
    </div>
    </template>
    <template v-else>
        <div id="op_2">
            <CardTitle :card-title="card.verbInfinitive"/>
            <Answer :answer="card.answer"/>
        </div>
    </template>
    <button @click="ok = !ok">show</button>
</template>



<style scoped>
    


    #op_1{
        background-color: white;
        padding: 50px;
    }

    #op_2{
        background-color: white;
        padding: 50px;
    }

    div {
        border: 2px solid peru;
        margin-bottom: 10%;
    }

    button {
        background-color: green;
    }

</style>