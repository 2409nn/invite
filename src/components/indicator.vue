<script setup lang="ts">

  import { reactive } from "vue";
  import { useRoute } from "vue-router";

  const pages = reactive([
    {id: 1, name: "first"},
    {id: 2, name: "place"},
    {id: 3, name: "date"},
    {id: 4, name: "last"},
]);

  const route = useRoute();


</script>

<template>
  <div class="indicator">
    <ul class="indicator__pages">
      <li v-for="page in pages"
          class="page"
          :id="page.name"
          :class="{ active: route.name === page.name }"
      ></li>
    </ul>
  </div>
</template>

<style scoped>

</style>