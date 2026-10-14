<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

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
  box-shadow: 0 0 0 1px var(--input-ring);
  background: var(--input-bg);
  width: 100%;
  padding: 5px 20px;
  color: var(--input-text);
  font-weight: 600;
  font-size: 14px;
  font-style: italic;
  border: none;

  transition: 0.15s ease-in-out;
}

input::placeholder {
  color: var(--input-placeholder);
  opacity: 1;
}

input:hover {
  cursor: pointer;
}

input:focus {
  box-shadow: 0 0 0 3px var(--input-focus);
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