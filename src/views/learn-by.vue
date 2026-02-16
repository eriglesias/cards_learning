<script setup>
    
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'; 
    const router = useRouter()
    const selectedCase = ref('')
    
    function startLearning() {
        if (!selectedCase.value) return
        router.push({
            name: 'learn-verbs',
            params: { case: selectedCase.value}
        })
    }

</script>

<template>
    <h2> Learning</h2>
    <label for="learning_mode">Select your learning mode: </label>
    <select v-model="selectedCase" id="select_case">
        <option disabled value=""> >--choose --</option>
        <option value="dative">Dative Verbs</option>
        <option value="accusative">Akkusative Verbs</option>
        <option value="genitive">Genitive Verbs</option>
    </select> 
    <button @click="startLearning"
    :disabled="!selectedCase">
    Start
    </button>  
</template>

<style scoped>
    h2 {
        font-size: 2em;
        color: black;
    }
</style>



