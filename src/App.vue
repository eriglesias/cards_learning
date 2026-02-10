<script setup>
import AnswerCard from './components/answer-card.vue';
//import jsonTest from './data/cards_info.json'
import LearningCard from './components/learning-card.vue';
import SelectMode from './views/learn-by.vue'
</script>

<template>
  <div>
  <!--<LearningCard />-->
  <!--<SelectMode/>-->
  <p><strong>Current route path:</strong> {{  $route.fullPath }}</p>
  <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/select">Go to Select Learning Case</RouterLink>
    <RouterLink to="/learn/verbs/dative">Learn Dative Verbs</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
  </div>
</template>

<style scoped>
  * {
    font-family: Helvetica;
  } 

</style>

