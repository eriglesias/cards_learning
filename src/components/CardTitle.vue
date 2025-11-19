<script setup>
    import { ref } from 'vue'
    defineProps({
        cardtitle: String,
    })
</script>

<template>
    <h2> {{  cardtitle }}</h2>   
</template>

<style scoped>
    h2 {
        font-size: 2em;
    }
</style>

