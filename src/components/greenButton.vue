<script setup>
const props = defineProps({
  label: { type: String, default: 'Да' },
  hoverLabel: { type: String, default: 'Жми' },
})

const emit = defineEmits(['accept'])

function onClick() {
  emit('accept')
}
</script>

<template>
  <button class="invite-btn" :aria-label="props.label" @click="onClick">
    <span class="invite-btn__labels" aria-hidden="true">
      <span class="invite-btn__label invite-btn__label--idle">{{ props.label }}</span>
      <span class="invite-btn__label invite-btn__label--hover">{{ props.hoverLabel }}</span>
    </span>
  </button>
</template>

<style scoped>
.invite-btn {
  appearance: none;
  border: 0;
  border-radius: 1000px;
  padding: 20px 56px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  background: var(--green-accent);
  cursor: pointer;
  touch-action: manipulation;
  box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.3);
  transition: background-color 180ms ease, transform 150ms ease, box-shadow 180ms ease;
}

.invite-btn:hover,
.invite-btn:focus-visible {
  background: var(--green-accent-hover);
}

.invite-btn:active {
  transform: scale(0.97);
  box-shadow: 0 2px 6px -3px rgba(0, 0, 0, 0.3);
}

.invite-btn:focus-visible {
  outline: 2px solid var(--green-accent);
  outline-offset: 3px;
}

/* Подписи: "О давай" уезжает вверх, "Жми" выезжает снизу */
.invite-btn__labels {
  position: relative;
  display: grid;
}

.invite-btn__label {
  grid-area: 1 / 1;
  text-align: center;
  white-space: nowrap;
  transition: transform 200ms ease, opacity 200ms ease;
}

.invite-btn__label--hover {
  opacity: 0;
  transform: translateY(60%);
}

.invite-btn:hover .invite-btn__label--idle,
.invite-btn:focus-visible .invite-btn__label--idle {
  opacity: 0;
  transform: translateY(-60%);
}

.invite-btn:hover .invite-btn__label--hover,
.invite-btn:focus-visible .invite-btn__label--hover {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 800px) {
  .invite-btn {
    padding: 18px 32px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .invite-btn,
  .invite-btn__label {
    transition: none;
  }
}
</style>