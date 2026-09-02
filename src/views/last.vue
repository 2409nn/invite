<script setup lang="ts">
import { ref } from 'vue'
import meme from '@/components/meme.vue'
import catImg from '@/assets/imgs/cat.jpg' // замени на свою картинку

const code = ref<string>('')
const copied = ref(false)

const generateCode = () => {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
}

code.value = generateCode()

async function copyCode() {
  await navigator.clipboard.writeText(code.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
</script>

<template>
  <div class="question">
    <meme :src="catImg" />
    <h1 class="title">ТЕПЕРЬ ПРИШЛИ МНЕ<br><u>В ЛС ЭТОТ КОД:</u></h1>

    <div class="code-wrap">
      <span class="code" :class="{ copied }" @click="copyCode">
        {{ copied ? 'Готово' : code }}
      </span>
      <div class="hint">
        <svg class="arrow" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 35 5 C 20 5, 5 20, 10 40" stroke="#555" stroke-width="2" stroke-linecap="round" fill="none"/>
          <path d="M 5 35 L 10 42 L 17 37" stroke="#555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
        <span>Нажми на него<br>чтоб скопировать)</span>
      </div>
    </div>
  </div>
</template>

<style scoped>

.question {
  margin: auto;
}

.code-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.code {
  font-size: clamp(64px, 16vw, 112px);
  font-weight: 900;

  cursor: pointer;
  transition: transform 0.15s cubic-bezier(.34,1.56,.64,1), color 0.2s;
  user-select: none;
  line-height: 1;

  background: linear-gradient(90deg, #2181ff, #ff5ba9, #596fff);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: background-position 0.6s ease;
}

.code:hover {
  background-position: right center;
}

.hint {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  color: #555;
  font-size: 14px;
  line-height: 1.4;
  margin-top: 4px;
}

.arrow {
  width: 40px;
  height: 50px;
  flex-shrink: 0;
  margin-top: -8px;
  transform: rotateX(180deg);
}
</style>