<script setup>
// 1. Принимаем значение от родителя (стандарт для v-model во Vue 3)
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

// 2. Объявляем правильное системное событие для v-model
const emit = defineEmits(['update:modelValue'])

// 3. Передаем новое значение родителю при вводе
function onInput(event) {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <input required ref="input" @input="onInput" type="text" placeholder="Если хз, набери “хз”" />
</template>

<style scoped>
input {
  border-radius: 1488px;
  appearance: none;
  box-shadow: 0 0 0 1px #B2B2B2;
  width: 100%;
  padding: 5px 20px;
  color: black;
  font-weight: 600;
  font-size: 14px;
  font-style: italic;
  border: none;

  transition: 0.15s ease-in-out;
}

input:hover {
  cursor: pointer;
}

input:focus {
  box-shadow: 0 0 0 3px var(--blue-color);
  padding: 5px 20px;
  outline: none;
  cursor: text;
  transition: 0.15s ease-in-out;
}

@media (max-width: 480px) {
  input {
    font-size: 12px;
  }
}

</style>