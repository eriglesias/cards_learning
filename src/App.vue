<script setup>
import LearningCard from './components/learning-card.vue';
import AnswerCard from './components/answer-card.vue';
import jsonTest from './data/card.json'
</script>

<template>
  <div>
  <LearningCard v-bind:learning-card="jsonTest.LearningCard"/>
  <AnswerCard v-bind:answer-card="jsonTest.AnswerCard"/>
  </div>
</template>

<style scoped>
  * {
    font-family: Helvetica;
  } 

</style>

