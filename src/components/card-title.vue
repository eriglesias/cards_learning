<script setup>
    import jsonTest from '../data/card.json'
    defineProps({
        cardTitle: String,
    })
</script>

<template>
    <h2> {{  jsonTest.verbInfinitive }}</h2>   
</template>

<style scoped>
    h2 {
        font-size: 2em;
    }
</style>

