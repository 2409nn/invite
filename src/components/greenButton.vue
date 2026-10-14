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
    <span class="invite-btn__shine" aria-hidden="true"></span>

    <!-- Обе подписи лежат в одной ячейке грида: ширина кнопки не прыгает при наведении -->
    <span class="invite-btn__labels" aria-hidden="true">
      <span class="invite-btn__label invite-btn__label--idle">{{ props.label }}</span>
      <span class="invite-btn__label invite-btn__label--hover">{{ props.hoverLabel }}</span>
    </span>

    <svg class="invite-btn__icon" viewBox="0 0 24 24" width="24" height="24" fill="none"
         stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  </button>
</template>

<style scoped>

@property --invite-glow {
  syntax: '<number>';
  inherits: false;
  initial-value: 0.4;
}

.invite-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  appearance: none;
  border: 0;
  border-radius: 1000px;
  padding: 20px 48px 20px 56px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 90, 45, 0.35);
  cursor: pointer;
  touch-action: manipulation;
  background: linear-gradient(180deg, #55e394 0%, #28c36b 55%, #1fad5b 100%);
  box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.55),
      inset 0 -3px 6px rgba(0, 95, 48, 0.28),
      0 1px 2px rgba(15, 110, 55, 0.45),
      0 10px 24px -8px rgb(30 217 106 / var(--invite-glow));
  transition:
      transform 260ms cubic-bezier(.34, 1.56, .64, 1),
      box-shadow 260ms ease,
      filter 260ms ease;
  animation: invite-glow 2.8s ease-in-out infinite;
}

.invite-btn:hover,
.invite-btn:focus-visible {
  transform: translateY(-2px) scale(1.03);
  filter: saturate(1.08);
  box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      inset 0 -3px 6px rgba(0, 95, 48, 0.28),
      0 1px 2px rgba(15, 110, 55, 0.45),
      0 16px 32px -8px rgb(30 217 106 / calc(var(--invite-glow) + 0.2));
}

.invite-btn:active {
  transform: translateY(1px) scale(0.97);
  box-shadow:
      inset 0 2px 6px rgba(0, 95, 48, 0.4),
      0 1px 2px rgba(15, 110, 55, 0.45),
      0 4px 12px -6px rgb(30 217 106 / 0.5);
  transition-duration: 90ms;
}

.invite-btn:focus-visible {
  outline: 3px solid rgba(66, 215, 129, 0.55);
  outline-offset: 4px;
}

.invite-btn__shine {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  overflow: hidden;
  pointer-events: none;
}

.invite-btn__shine::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -60%;
  width: 40%;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.55), transparent);
  transform: skewX(-20deg);
  transition: left 700ms ease;
}

.invite-btn:hover .invite-btn__shine::before,
.invite-btn:focus-visible .invite-btn__shine::before {
  left: 130%;
}

.invite-btn__labels {
  position: relative;
  display: grid;
}

.invite-btn__label {
  grid-area: 1 / 1;
  text-align: center;
  white-space: nowrap;
  transition: transform 300ms cubic-bezier(.22, 1, .36, 1), opacity 220ms ease;
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

.invite-btn__icon {
  position: relative;
  flex-shrink: 0;
  transition: transform 300ms cubic-bezier(.34, 1.56, .64, 1);
}

.invite-btn:hover .invite-btn__icon,
.invite-btn:focus-visible .invite-btn__icon {
  transform: translateX(6px);
}

@keyframes invite-glow {
  0%, 100% { --invite-glow: 0.35; }
  50%      { --invite-glow: 0.8; }
}

@media (max-width: 800px) {
  .invite-btn {
    padding: 18px 32px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .invite-btn,
  .invite-btn__label,
  .invite-btn__icon,
  .invite-btn__shine::before {
    animation: none;
    transition: none;
  }
}
</style>
