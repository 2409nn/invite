<script setup>
import { onBeforeUnmount, ref, unref, watch } from "vue";

const props = defineProps({
  label: { type: String, default: 'Нет' },
  container: { type: Object, default: null },
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

function detach() {
  if (!containerEl) return;
  containerEl.removeEventListener('pointermove', handleMove);
  containerEl.removeEventListener('pointerleave', resetOffset);
  containerEl = null;
}

function attach(el) {
  detach();
  if (isTouch || !el) return;
  containerEl = el;
  containerEl.addEventListener('pointermove', handleMove);
  containerEl.addEventListener('pointerleave', resetOffset);
}

watch(() => unref(props.container), attach, { immediate: true });

onBeforeUnmount(detach);
</script>

<template>
  <button
      ref="btn"
      class="dodge-btn"
      :style="{ transform: `translate(${offsetX}px, ${offsetY}px)` }"
      @click="onClick"
  >
    {{ props.label }}
  </button>
</template>

<style scoped>
.dodge-btn {
  appearance: none;
  border: 0;
  border-radius: 1000px;
  padding: 20px 56px;
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  background: #e22350;
  cursor: pointer;
  touch-action: manipulation;
  will-change: transform;
  z-index: 2;
  box-shadow: 0 4px 10px -4px rgba(0, 0, 0, 0.3);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
  background-color 180ms ease,
  box-shadow 180ms ease;
}

.dodge-btn:hover {
  background: #cf1e46;
}

.dodge-btn:active {
  box-shadow: 0 2px 6px -3px rgba(0, 0, 0, 0.3);
}

.dodge-btn:focus-visible {
  outline: 2px solid #e22350;
  outline-offset: 3px;
}

@media (max-width: 800px) {
  .dodge-btn {
    padding: 18px 32px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dodge-btn {
    transition: none !important;
  }
}
</style>