
<script setup>
    import CardTitle from './card-title.vue';
import SentenceTemplate from './sentence-template.vue';
    import sentenceTemplate from './sentence-template.vue';
</script>

<template>
  <div>
  <CardTitle v-bind:card-title/>
  <SentenceTemplate v-bind:sentence-template/>
  </div>
</template>


<style scoped>
    * {
        background-color: white;
        border: 2px solid black;
        border-radius: 5px;
        padding: 20px;
    }

</style>