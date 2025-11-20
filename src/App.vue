<script setup>
import LearningCard from './components/learning-card.vue';
import jsonTest from './data/card.json'
</script>

<template>
  <div>
  <LearningCard v-bind:learning-card="jsonTest.LearningCard"/>
  </div>
</template>

<style scoped>
  * {
    font-family: Helvetica;
  } 
</style>

