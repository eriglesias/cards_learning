<script setup>
    
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'; 
    const router = useRouter()
    const selectedCase = ref('')
    const selectedType = ref('')
    function startLearning() {
    if (!selectedCase.value || !selectedType.value) return;

    if (selectedType.value === 'governance') {
        router.push({ name: 'learn-governance' });
        return;
    }

    router.push({
        name: 'learn-verbs',
        params: { case: selectedCase.value },
        query: { type: selectedType.value }
    });
}

</script>

<template>
    <h2> Learning</h2>
    <label for="select_case">Case: </label>
    <select v-model="selectedCase" id="select_case">
    <option disabled value=""> >--choose case--</option>
    <option value="dativ">Dative Verbs</option>
    <option value="akkusativ">Accusative Verbs</option>
    <option value="genitiv">Genitive Verbs</option>
    </select>

    <label for="select_type">Exercise: </label>
    <select v-model="selectedType" id="select_type">
    <option disabled value=""> >--exercise type--</option>
    <option value="production">Fill in the pronoun</option>
    <option value="recognition">Choose the pronoun</option>
    <option value="governance">Which case does it govern?</option>
    </select>
    <button @click="startLearning"
        :disabled="!selectedCase || !selectedType">
        Start
    </button>  
</template>

<style scoped>
    h2 {
        font-size: 2em;
        color: black;
    }
</style>



