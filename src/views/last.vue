<script setup lang="ts">
import { ref } from 'vue'

const generateCode = () => {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}

// Создаем реактивную переменную для отображения в <template>
const code = ref<string>('');

// Проверяем наличие кода в сессии
const storedCode = sessionStorage.getItem('code');

if (storedCode) {
  code.value = storedCode;
}

else {
  code.value = generateCode(); // Если кода нет — генерируем новый и сохраняем
  sessionStorage.setItem('code', code.value);
}

</script>

<template>
  <div>
    <p> ТЕПЕРЬ ПРИШЛИ МНЕ В <u>ЛС ЭТОТ КОД</u>:<br>{{ code }}</p>
  </div>
</template>

<style scoped>

</style>