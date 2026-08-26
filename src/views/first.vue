<script setup>
  import meme from "../components/meme.vue"
  import sprashivaushiyKot from "../assets/imgs/sprashivaushiyKot.jpg"
  import RedButton from "@/components/redButton.vue";
  import greenButton from "@/components/greenButton.vue";
  import { ref, onMounted } from "vue";

  const stage = ref(null);

  onMounted(() => {
    console.log(stage);
  })

</script>

<template>
  <meme :src="sprashivaushiyKot" />
  <h1>КАК НАСЧЕТ СХОДИТЬ <u>КУДА-ТО ВДВОЕМ?</u><br>👉👈</h1>
  <div ref="stage" class="stage" style="position: relative; height: 220px">
    <div class="stage__negative"> <RedButton :container="stage" label="Неа" /> </div>
    <div class="stage__positive"> <greenButton label="О давай" hover-label="Нажимай" /> </div>
  </div>

</template>

<style scoped lang="scss">

  .stage {
    display: grid;
    grid-template-columns: 50% 50%;

    &__positive {
      width: fit-content;
      height: fit-content;
      margin: auto;
    }

    &__negative {
      width: fit-content;
      height: fit-content;
      margin: auto;
    }
  }

</style>