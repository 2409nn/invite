<script setup>

import {ref} from "vue";
import cat from "@/assets/imgs/images.jpeg";
import meme from "../components/meme.vue"
import calendar from "../components/calendar.vue"
import { useRouter } from "vue-router";
import date from "@/views/date.vue";

const router = useRouter()

const calendarData = ref(null);

const btnClickHandler = () => {
  const d = calendarData.value
  if (!d) return

  const endHour = d.selectedHour + d.selectedDur
  const min = d.selectedMin

  const humanReadable = `${d.date} (${d.weekday}), с ${d.selectedHour}:${min} до ${endHour}:${min}`

  const dateToSave = {
    ...d,
    humanReadable,
  }

  sessionStorage.setItem('date', JSON.stringify(dateToSave))
  router.push({ path: '/last' })
}

</script>

<template>
  <div class="question">
    <meme :src="cat" />
    <h1>ВЫБЕРЕМ <u>ДАТУ...</u></h1>
  </div>

  <div class="cal-wrap">
    <div class="info-box">
      <div class="info-text">
        <template v-if="calendarData?.date">
      <span class="info-date">
        <i class="ti ti-calendar-heart" aria-hidden="true"></i>
        {{ calendarData.date }}, {{ calendarData.weekday }}
      </span>
          <span v-if="calendarData.selectedDur" class="info-time">
        С {{ calendarData.selectedHour }}:{{ calendarData.selectedMin }}
        до {{ calendarData.selectedHour + calendarData.selectedDur }}:{{ calendarData.selectedMin }}
      </span>
        </template>
        <span v-else class="info-hint">Выберите дату и время</span>
      </div>

      <button class="cal-btn" v-if="calendarData?.selectedDur" @click="btnClickHandler">
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM18.4158 9.70405C18.8055 9.31268 18.8041 8.67952 18.4127 8.28984L17.7041 7.58426C17.3127 7.19458 16.6796 7.19594 16.2899 7.58731L10.5183 13.3838L7.19723 10.1089C6.80398 9.72117 6.17083 9.7256 5.78305 10.1189L5.08092 10.8309C4.69314 11.2241 4.69758 11.8573 5.09083 12.2451L9.82912 16.9174C10.221 17.3039 10.8515 17.301 11.2399 16.911L18.4158 9.70405Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <calendar v-model="calendarData" />
  </div>

</template>

<style scoped>

.cal-wrap {
  max-width: 360px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: inherit;
}


.info-box {
  background: #f7f7f5;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: 12px 16px;
  min-height: 52px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.info-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-hint { font-size: 14px; color: #aaa; }
.info-date {
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 6px;
}
.info-date i { color: #4f7ef8; font-size: 16px; }
.info-time { font-size: 13px; color: #777; }
</style>