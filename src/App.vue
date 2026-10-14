<script setup lang="ts">
  import { reactive } from "vue";
  import indicator from "./components/indicator.vue"


</script>

<template>
  <header>

  </header>

  <main>
    <section id="content">
      <router-view v-slot="{ Component, route }">
        <transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </section>
    <section id="indicator"> <indicator /> </section>
  </main>
</template>

<style lang="scss">

.page-enter-active,
.page-leave-active {
  transition: opacity 0.38s cubic-bezier(.22, 1, .36, 1),
              transform 0.38s cubic-bezier(.22, 1, .36, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(18px) scale(0.98);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-14px) scale(0.98);
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.15s linear;
  }
  .page-enter-from,
  .page-leave-to {
    transform: none;
  }
}
</style>
