
<script setup>
    import { ref, computed, watch} from 'vue';
    import { getVerb , conjugate, getVerbsByCase, getVerbArguments, getGovernedCases, getCasePronoun } from '../domain/verbs-domain.js';
    import CardTitle from './card-title.vue';
    import SentenceTemplate from './sentence-template.vue';
    import Answer from './answer.vue';
    
    const props = defineProps({
        verbId: {
            type: String,
            required: true
        }
    });

    const ok = ref(true);
    watch (() => props.verbId, () => {
        ok.value = true;
    })
    const verb = computed(() => getVerb(props.verbId));
    const promptTemplate = computed(() => 'Ich [?] ...');
    const governedCases = computed(() => getGovernedCases(props.verbId));
    
    const answerText = computed(() => {
        const targetCase = governedCases.value?.[0] || 'dativ';
        const conjugated = conjugate(props.verbId, '1sg');
        const pronoun = getCasePronoun(targetCase, 'er');
        return ` Ich ${conjugated} ${pronoun}`;
    });

</script>

<template>
    <div v-if="verb">
        <div v-if="ok" id="op_1">
            <CardTitle :card-title="verb.verbInfinitive" />
            <SentenceTemplate :sentence-template="promptTemplate" />
        </div>
        <div v-else id="op_2">
            <CardTitle :card-title="verb.verbInfinitive" />
            <Answer :answer="answerText" />
        </div>
        <button @click="ok = !ok">
            {{  ok ? 'Show Answer' : 'Show Question' }}
        </button>
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


