<script setup>
    import CardTitle from './card-title.vue';
    import SentenceTemplate from './sentence-template.vue';
    import Answer from './answer.vue';
    
    const props = defineProps({
        exercise: {
            type: Object,
            required: true
        },
        isRevealed: { type: Boolean, required: true }
    });
</script>

<template>
    <div v-if="props.exercise">
        <div v-if="!isRevealed" id="op_1">
            <CardTitle :card-title="props.exercise.ui.title" />
            <SentenceTemplate :sentence-template="props.exercise.ui.prompt" />
        </div>
        <div v-else id="op_2">
            <CardTitle :card-title="props.exercise.ui.title" />
            <Answer :answer="props.exercise.ui.fullSolution" />
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


