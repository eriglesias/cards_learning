<script setup>
    defineProps({
        SentenceTemplate: String,
    })
</script>

<template>
    <h2> {{  SentenceTemplate }}</h2>   
</template>

<style scoped>
    h2 {
        font-size: 2em;
    }
</style>