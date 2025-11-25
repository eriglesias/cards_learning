<script setup>
    import jsonTest from '../data/card.json'
    defineProps({
        answer: String,
    })
</script>

<template>
    <h2> {{  jsonTest.answer }}</h2>   
</template>

<style scoped>
    h2 {
        font-size: 2em;
        color: black;
    }
</style>

