<script setup>
    
    //router.push(path: '/users/eduardo')


    import { ref } from 'vue';

    const option = ref(0)

    function getCase() {
        {{option}}
    }
    
</script>

<template>
    <h2> Learning</h2>
    <label for="learning_mode">Select your learning mode: </label>
    <select name="learning_mode" id="select_case">
        <option value="dative">Dative Verbs</option>
        <option value="accusative">Akkusative Verbs</option>
        <option value="genitive">Genitive Verbs</option>
    </select>   
</template>

<style scoped>
    h2 {
        font-size: 2em;
        color: black;
    }
</style>



