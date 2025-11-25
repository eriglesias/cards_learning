
<script setup>
    import CardTitle from './card-title.vue';
    import Answer from './answer.vue';
</script>

<template>
  <div>
  <CardTitle v-bind:card-title/>
  <Answer v-bind:answer/>
  </div>
</template>


<style scoped>
    * {
        background-color: white;
        border-radius: 5px;
        padding: 20px;
        color: black;
    }
    div {
        border: 2px solid brown;
    }
</style>