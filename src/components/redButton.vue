<script setup>
import {onMounted, onBeforeUnmount, ref, onBeforeUpdate} from "vue";

const props = defineProps({
  label: { type: String, default: 'Нет' },
  container: { type: Object, required: true },
});

const emits = defineEmits(["click"]);
const onClick = () => emits("click");

const btn = ref(null);
const offsetX = ref(0);
const offsetY = ref(0);

const RADIUS = 140;   // зона реакции вокруг кнопки
const MAX_SHIFT = 60; // максимальное смещение

let containerEl = null;
const isTouch = window.matchMedia('(pointer: coarse)').matches;

function handleMove(e) {
  if (!btn.value) return;
  const rect = btn.value.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const dx = cx - e.clientX;
  const dy = cy - e.clientY;
  const dist = Math.hypot(dx, dy);

  if (dist < RADIUS && dist > 0) {
    const power = (1 - dist / RADIUS) * MAX_SHIFT;
    offsetX.value = (dx / dist) * power;
    offsetY.value = (dy / dist) * power;
  } else {
    offsetX.value = 0;
    offsetY.value = 0;
  }
}

function resetOffset() {
  offsetX.value = 0;
  offsetY.value = 0;
}

onBeforeUpdate(() => {
  containerEl = props.container?.value ?? props.container;
  if (isTouch || !containerEl) return;
  containerEl.addEventListener('pointermove', handleMove);
  containerEl.addEventListener('pointerleave', resetOffset);
});

onBeforeUnmount(() => {
  if (isTouch || !containerEl) return;
  containerEl.removeEventListener('pointermove', handleMove);
  containerEl.removeEventListener('pointerleave', resetOffset);
});
</script>

<template>
  <button
      ref="btn"
      class="dodge-btn"
      :class="{ 'dodge-btn--touch': isTouch }"
      :style="{ transform: `translate(${offsetX}px, ${offsetY}px)` }"
      @click="onClick"
  >
    {{ props.label }}
  </button>
</template>

<style scoped>
.dodge-btn {
  appearance: none;
  background: #e22350;
  cursor: pointer;
  touch-action: manipulation;
  box-shadow: 0 6px 16px -6px rgba(217, 69, 95, 0.6);
  will-change: transform;
  z-index: 2;
  transition:
      transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
      background-color 0.2s ease,
      box-shadow 0.2s ease;
}

.dodge-btn:hover {
  filter: brightness(0.9);
  box-shadow: 0 8px 20px -6px rgba(217, 69, 95, 0.75);
}

.dodge-btn:active {
  transform: scale(0.96) translate(v-bind(offsetX + 'px'), v-bind(offsetY + 'px'));
}

.dodge-btn:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 3px;
  box-shadow: 0 0 0 4px rgba(217, 69, 95, 0.35);
}

.dodge-btn--final {
  --dodge-bg: #8a8a8a;
  --dodge-bg-hover: #767676;
  box-shadow: 0 6px 16px -6px rgba(0, 0, 0, 0.35);
}

.dodge-btn--touch:not(.dodge-btn--final):active {
  transform: scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .dodge-btn {
    transition: none !important;
  }
}
</style>