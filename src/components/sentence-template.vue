<script setup>
    //import jsonTest from '../data/card.json'
    const props = defineProps({
        sentenceTemplate: String,
    })
</script>

<template>
    <h2> {{ props.sentenceTemplate }}</h2>   
</template>

<style scoped>
    h2 {
        font-size: 2em;
        color: black;
    }
</style>

   