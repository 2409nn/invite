<script setup>

import {ref, watch} from "vue";
import cat from "@/assets/imgs/images.jpeg";
import meme from "../components/meme.vue"
import calendar from "../components/calendar.vue"

const date = ref(null);

</script>

<template>

  <meme :src="cat" />
  <h1>ВЫБЕРЕМ <u>ДАТУ...</u></h1>
  <calendar v-model="date" />

</template>

<style scoped>

</style>