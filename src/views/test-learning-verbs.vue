<script setup>

    import { useTrainer } from '../application/trainer';
    import { useRoute} from 'vue-router';
    import LearningCard from '../components/learning-card.vue';
    import {  getVerbsByCase} from '../domain/verbs-domain.js';
    const route = useRoute()
    const selectedCase = route.params.case;
    const verbIds = getVerbsByCase(selectedCase);

    const {
        currentExercise,
        isFinished,
        isRevealed,
        reveal,
        rate,
        restart
    } = useTrainer(verbIds, selectedCase)

</script>

<template>
  
  <div v-if="isFinished">
    <p>Session complete.</p>
    <button @click="restart">Restart</button>
  </div>

  <div v-else>
    <!--view shouldnt do string manipulation, domain should bring prompt and solution fields-->
    <LearningCard :exercise="currentExercise" :is-revealed="isRevealed" />
    <button v-if="!isRevealed" @click="reveal">Show Answer</button>
    <button  v-if="isRevealed" @click="rate('again')">Again</button>
    <button  v-if="isRevealed" @click="rate('hard')">Hard</button>
    <button  v-if="isRevealed" @click="rate('good')">Good</button>
    <button  v-if="isRevealed" @click="rate('easy')">Easy</button>
  </div>

</template>


<style scoped>
    

    #op_1{
        background-color: white;
        padding: 50px;
    }

    #op_2{
        background-color: #000080;
        padding: 50px;
    }

    #op_2 h2 {
        color: #FFCD00;
    }

    div {
        border: 2px solid peru;
        margin-bottom: 10%;
    }

    button {
        background-color: green;
    }

</style>



