<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, default: 'Да' },
  hoverLabel: { type: String, default: 'Жми' },
})

const emit = defineEmits(['accept'])

const btnRef = ref(null)
const label = ref(props.label)
const isHover = ref(false)

function onClick() {
  emit('accept')
}
</script>

<template>
  <button
      ref="btnRef"
      class="invite-btn"
      :class="{ 'invite-btn--hover': isHover }"
      @click="onClick"
      @mouseenter="() => { isHover = true; label = props.hoverLabel }"
      @mouseleave="() => { isHover = false; label = props.label }"
  >
    <span class="invite-btn__glow" aria-hidden="true"></span>
    <span class="invite-btn__label"> {{ label }} </span>
  </button>
</template>

<style scoped>
.invite-btn {
  --accent: #42d781;
  --accent-hover: #38c975;
  --glow: rgb(30, 217, 106);

  position: relative;
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
  filter: brightness(1) saturate(1);
  box-shadow: 0 0 0 0;
  animation: invite-idle-0212a7bb 2.6s ease-in-out infinite;
}

.invite-btn__glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle, var(--glow), transparent 70%);
  opacity: 0;
  transition: opacity 400ms ease;
  pointer-events: none;
  z-index: -1;
}

.invite-btn--hover .invite-btn__glow {
  opacity: 1;
}

.invite-btn__label {
  position: relative;
}

@keyframes invite-idle {
  0%, 100% { box-shadow: 0 6px 18px -6px var(--glow); }
  50% { box-shadow: 0 8px 22px -4px var(--glow); }
}

@media (prefers-reduced-motion: reduce) {
  .invite-btn {
    animation: none;
    transition: none;
  }
}
</style>