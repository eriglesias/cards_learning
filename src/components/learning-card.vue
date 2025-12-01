
<script setup>
    import CardTitle from './card-title.vue';
    import SentenceTemplate from './sentence-template.vue';
    const msg = "Hello!"
    //import {log} from '../data/helpers_test'
</script>

<template>
  <div>
  <CardTitle v-bind:card-title/>
  <SentenceTemplate v-bind:sentence-template/>
   <button @click="log"> {{ msg }}</button>
  </div>
 
</template>


<style scoped>
    * {
        background-color: white;
        border-radius: 5px;
        padding: 20px;
    }

    div {
        border: 2px solid brown;
    }

    button {
        background-color: red;
    }

</style>