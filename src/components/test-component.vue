
<script setup>
    import card from '../data/card.json';
    import CardTitle from './card-title.vue';
    import SentenceTemplate from './sentence-template.vue';
    import Answer from './answer.vue';

    const props = defineProps({
     ok: Boolean,
    })

</script>

<template>
    <template v-if="ok">
    <div>
    <CardTitle/>
    <SentenceTemplate :sentence-template="card.sentenceTemplate"/>
    </div>
    </template>
    <template v-else>
        <div>
            <CardTitle :title="card.verbInfinitive"/>
            <Answer :answer="card.answer"/>
        </div>
    </template>
    <button @click="ok = !ok">show</button> 
</template>



<style scoped>
    * {
        background-color: white;
        border-radius: 5px;
        padding: 20px;
    }

    div {
        border: 2px solid peru;
    }

    button {
        background-color: green;
    }

</style>