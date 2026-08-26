<script setup lang="ts">
  import { reactive } from "vue";
  import indicator from "./components/indicator.vue"


</script>

<template>
  <header>

  </header>

  <main>
    <section id="content"> <router-view></router-view> </section>
    <section id="indicator"> <indicator /> </section>
  </main>
</template>

<style scoped lang="scss">

</style>
