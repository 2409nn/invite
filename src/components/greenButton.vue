<template>
  <button
      ref="btnRef"
      type="button"
      class="invite-btn"
      :class="{ 'invite-btn--hover': hovered, 'invite-btn--pressed': pressed }"
      :aria-label="displayLabel"
      @pointerenter="onEnter"
      @pointerleave="onLeave"
      @pointerdown="pressed = true"
      @pointerup="pressed = false"
      @pointercancel="pressed = false"
      @click="onClick"
  >
    <span class="invite-btn__glow" aria-hidden="true"></span>
    <span class="invite-btn__label">
      <slot :hovered="hovered">{{ displayLabel }}</slot>
    </span>
  </button>
</template>

<script setup>
/**
 * GreenButton — кнопка согласия.
 * При наведении становится ярче, немного растёт и мягко пульсирует,
 * всем видом "выпрашивая" клик. Можно передать hoverLabel — текст,
 * который появится вместо обычного при наведении (например, "Ну же!").
 */
import { ref, computed } from 'vue'

const props = defineProps({
  label: { type: String, default: 'Да' },
  hoverLabel: { type: String, default: '' }, // например: 'Ну же, нажми!'
})

const emit = defineEmits(['accept'])

const btnRef = ref(null)
const hovered = ref(false)
const pressed = ref(false)

const displayLabel = computed(() => (hovered.value && props.hoverLabel ? props.hoverLabel : props.label))

function onEnter() {
  hovered.value = true
}
function onLeave() {
  hovered.value = false
  pressed.value = false
}
function onClick() {
  emit('accept')
}
</script>

<style scoped>
.invite-btn {
  --accent: #2fae66;
  --accent-hover: #38c975;
  --glow: rgba(56, 201, 117, 0.55);

  appearance: none;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(180deg, var(--accent-hover), var(--accent));
  cursor: pointer;
  isolation: isolate;
  transform: scale(1);
  transition: transform 220ms cubic-bezier(.34,1.56,.64,1),
  filter 220ms ease,
  box-shadow 220ms ease;
  box-shadow: 0 6px 18px -6px var(--glow);
  filter: brightness(1) saturate(1);
  animation: invite-idle 2.6s ease-in-out infinite;
}

.invite-btn__glow {
  position: absolute;
  inset: -6px;
  border-radius: inherit;
  background: radial-gradient(circle, var(--glow), transparent 70%);
  opacity: 0;
  transition: opacity 220ms ease;
  z-index: -1;
}

.invite-btn__label {
  position: relative;
}

.invite-btn--hover {
  transform: scale(1.08);
  filter: brightness(1.15) saturate(1.2);
  box-shadow: 0 10px 26px -6px var(--glow);
  animation: invite-hover-pulse 900ms ease-in-out infinite;
}

.invite-btn--hover .invite-btn__glow {
  opacity: 1;
}

.invite-btn--pressed {
  transform: scale(0.97);
}

@keyframes invite-idle {
  0%, 100% { box-shadow: 0 6px 18px -6px var(--glow); }
  50% { box-shadow: 0 8px 22px -4px var(--glow); }
}

@keyframes invite-hover-pulse {
  0%, 100% { transform: scale(1.08); }
  50% { transform: scale(1.13); }
}

@media (prefers-reduced-motion: reduce) {
  .invite-btn,
  .invite-btn--hover {
    animation: none;
    transition: filter 150ms ease, box-shadow 150ms ease;
  }
}
</style>