<script setup>
import LearningCard from './components/learning-card.vue';
import AnswerCard from './components/answer-card.vue';
import jsonTest from './data/card.json'
import TestComponent from './components/test-component.vue';
</script>

<template>
  <div>
  <!--
  <LearningCard v-bind:learning-card="jsonTest.LearningCard"/>
  <AnswerCard v-bind:answer-card="jsonTest.AnswerCard"/>  
  -->
  <!-- <TestComponent v-bind:test-component="jsonTest.TestComponent"/> -->
  <TestComponent />
  </div>
</template>

<style scoped>
  * {
    font-family: Helvetica;
  } 

</style>

