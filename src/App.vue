<script setup>
import CardTitle from './components/CardTitle.vue';
import SentenceTemplate from './components/SentenceTemplate.vue';
import titleTest from './data/card.json';
</script>

<template>
  <div>
  <CardTitle v-bind:cardtitle="titleTest.verbInfinitive"/>
  <SentenceTemplate v-bind:SentenceTemplate="titleTest.sentenceTemplate"/>
  </div>
</template>

<style scoped>
  * {
    font-family: Helvetica;
  } 
</style>
