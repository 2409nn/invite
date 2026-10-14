<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
})
</script>

<template>
  <span class="checkbox">
    <span class="radio" :class="{ checked: modelValue }" />
    <span v-if="label" class="label">{{ label }}</span>
  </span>
</template>

<style scoped>
.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  user-select: none;
}

.radio {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease;
  flex-shrink: 0;
}

.radio::after {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ffffff;
  transform: scale(0);
  transition: transform 0.2s cubic-bezier(.34, 1.56, .64, 1);
}

.radio.checked {
  border-color: #ffffff;
}

.radio.checked::after {
  transform: scale(1);
}

.label {
  font-size: 15px;
  color: var(--text-strong);
}
</style>