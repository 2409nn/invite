<script setup>
import {computed, onBeforeUnmount, ref, unref, watch} from "vue";

const props = defineProps({
  label: { type: String, default: 'Нет' },
  container: { type: Object, default: null },
});

const emits = defineEmits(["click"]);
const onClick = () => emits("click");

const btn = ref(null);
const offsetX = ref(0);
const offsetY = ref(0);
const tilt = computed(() => Math.max(-8, Math.min(8, offsetX.value * 0.18)));

const RADIUS = 140; // зона реакции вокруг кнопки
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
      :style="{ transform: `translate(${offsetX}px, ${offsetY}px) rotate(${tilt}deg)` }"
      @click="onClick"
  >
    {{ props.label }}
  </button>
</template>

<style scoped>
.dodge-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  border: 0;
  border-radius: 1000px;
  padding: 20px 56px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: #fff;
  text-shadow: 0 1px 2px rgba(110, 0, 25, 0.4);
  cursor: pointer;
  touch-action: manipulation;
  will-change: transform;
  z-index: 2;
  background: linear-gradient(180deg, #ff6a86 0%, #ee2f58 55%, #d61f49 100%);
  box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.5),
      inset 0 -3px 6px rgba(120, 0, 30, 0.28),
      0 1px 2px rgba(150, 10, 40, 0.45),
      0 10px 22px -8px rgba(226, 35, 80, 0.6);
  transition:
      transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
      scale 0.2s cubic-bezier(.34, 1.56, .64, 1),
      filter 0.2s ease,
      box-shadow 0.2s ease;
}

.dodge-btn:hover {
  filter: brightness(1.06) saturate(1.05);
  box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.55),
      inset 0 -3px 6px rgba(120, 0, 30, 0.28),
      0 1px 2px rgba(150, 10, 40, 0.45),
      0 14px 28px -8px rgba(226, 35, 80, 0.75);
}

.dodge-btn:active {
  scale: 0.96;
  box-shadow:
      inset 0 2px 6px rgba(120, 0, 30, 0.4),
      0 1px 2px rgba(150, 10, 40, 0.45),
      0 4px 12px -6px rgba(226, 35, 80, 0.5);
}

.dodge-btn:focus-visible {
  outline: 3px solid rgba(255, 106, 134, 0.55);
  outline-offset: 4px;
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
