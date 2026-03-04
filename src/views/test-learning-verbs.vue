
<script setup>

    import CardTitle from '../components/card-title.vue';
    import SentenceTemplate from '../components/sentence-template.vue';
    import Answer from '../components/answer.vue';
    import { useTrainer } from '../application/trainer';
    import { useRoute} from 'vue-router'
    const route = useRoute()
    const selectedCase = route.params.case;
    import normalized from '../data/normalize';


    const verbsForThisCase = computed(() => {
        const ids =  normalized.verbsByCase[selectedCase]
        if (!ids) return []
        return Array.from(ids).map(id => normalized.verbsById[id])
    })

    function createCards(verbsForThisCase) {
        const inf = verbsForThisCase.verbInfinitive;

    }
  
    const cards = createCardsForCase(selectedCase)

    const {
        currentCard,
        isFinished,
        isRevealed,
        reveal,
        rate,
        restart
    } = useTrainer(cards)

</script>

<template>
  
  <div v-if="isFinished">
    <p>Session complete.</p>
    <button @click="restart">Restart</button>
  </div>

  <div v-else>
    <!--view shouldnt do string manipulation, domain should bring prompt and solution fields-->
    <div v-if="!isRevealed" id="op_1">
      <CardTitle :card-title="currentCard.verbInfinitive"/>
      <SentenceTemplate 
        :sentence-template="buildSentenceTemplate(currentCard.verbInfinitive)"
      />
      <button @click="reveal">Show Answer</button>
    </div>

    <div v-else id="op_2">
      <CardTitle :card-title="currentCard.verbInfinitive"/>
      <Answer 
        :answer="giveAnswer(currentCard.verbInfinitive) + returnCase()"
      />
      <button @click="rate('again')">Again</button>
      <button @click="rate('hard')">Hard</button>
      <button @click="rate('good')">Good</button>
      <button @click="rate('easy')">Easy</button>
    </div>

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



