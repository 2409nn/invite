<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <img :src="src" alt="sukaNeZagruzilos" class="meme">
</template>

<style scoped lang="scss">
  .meme {
    height: 339px;
    width: 339px;
    border-radius: 20px;
    border: solid 3px white;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
    display: block;
    margin: auto;
  }
</style>