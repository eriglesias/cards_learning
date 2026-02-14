
<script setup>

    import normalized from '../services/normalize';
    import CardTitle from './card-title.vue';
    import SentenceTemplate from './sentence-template.vue';
    import Answer from './answer.vue';
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { computed } from 'vue'; 
    
    const ok = ref(true);
    const route = useRoute();
    const router = useRouter();
    
    //console.log(router);
    //console.log(route.params);
    //console.log(route.params.case);
    //console.log(route.query);
    //console.log(normalized.verbsById);
    
    function buildSentenceTemplate(inf) {
        let stem = inf.replace(/en$/, '').replace(/n$/, '')
        return `Ich ${stem}e [?]`
    }

    function giveAnswer(inf) {
        let stem = inf.replace(/en$/, '').replace(/n$/, '')
        return `Ich ${stem}e `
    }
    
   function returnCase() {
        let dativSubject = {
            "ich": "mir",
            "du": "dir",
            "er": "ihm",
            "sie": "ihr",
            "es": "ihm",
            "wir": "uns",
            "ihr": "euch",
            "sie": "ihnen",
            "Sie": "Ihnen"
        }
        const values = Object.values(dativSubject);
        const randomIndex = Math.floor(Math.random() * values.length);
        return values[randomIndex]; 
    }

    
    const verbsForThisCase = computed(() => {
        const selectCase = route.params.case
        const ids =  normalized.verbsByCase[selectCase]
        if (!ids) return []
        return Array.from(ids).map(id => normalized.verbsById[id])

    })


</script>

<template>
    <template v-for="card in verbsForThisCase"
        :key="card.id"
    >
        <template v-if="ok">
            <div id="op_1">
                <CardTitle :card-title="card.verbInfinitive"/>
                <SentenceTemplate :sentence-template="buildSentenceTemplate(card.verbInfinitive)"/>
            </div>
        </template>
    <template v-else>
        <div id="op_2">
            <CardTitle :card-title="card.verbInfinitive"/>
            <Answer :answer="giveAnswer(card.verbInfinitive ) + returnCase()"/> 
        </div>
    </template>
    <button @click="ok = !ok">show</button>
    </template>
    
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


