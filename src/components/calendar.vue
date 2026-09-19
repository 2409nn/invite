<script setup>
import { ref, computed, watch } from 'vue'

// --- ВЗАИМОДЕЙСТВИЯ КОМПОНЕНТОВ ---
const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['update:modelValue'])

// --- СОСТОЯНИЯ ---
const selectedDay  = ref(null);
const selectedHour = ref(18);
const selectedMin  = ref('00');
const selectedDur  = ref(null);

// --- КОНСТАНТЫ ---
const OFFSET   = 2;
const DAYS     = 31;
const WEEKDAYS = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
const MAX_LATE = 22;
const DURATIONS = [1, 2, 3, 4, 6];
const allowedDurations = ref([]);
const HOURS    = Array.from({ length: 12 }, (_, i) => i + 8);
const dayOfWeekNames = ['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'];

function dow(day) {
  return (OFFSET + day - 1) % 7;
}

function isWeekend(day) {
  const d = dow(day);
  return d === 5 || d === 6;
}

const appointment = computed(() => {
  if (!selectedDay.value) return null;
  return {
    date: `${selectedDay.value} октября`,
    weekday: dayOfWeekNames[dow(selectedDay.value)],
    selectedHour: selectedHour.value,
    selectedMin: selectedMin.value,
    selectedDur: selectedDur.value,
    time: `${String(selectedHour.value).padStart(2,'0')}:${selectedMin.value}`,
  }
})

function clearTimeData() {
  selectedHour.value = 18;
  selectedMin.value = '00';
  selectedDur.value = null;
}

function selectDay(day) {
  selectedDay.value = day;
  clearTimeData();
  save();
}

function selectDur(h) {
  selectedDur.value = h;
  save();
}

function save() {
  if (!appointment.value) return;
  emit('update:modelValue', { ...appointment.value });
}

watch(selectedHour, (newHour) => {
  allowedDurations.value = DURATIONS.filter((hour) => newHour + hour <= MAX_LATE);
  selectedDur.value = null;
  save();
}, { immediate: true });
</script>

<template>

    <div class="calendar">
      <div class="cal-title">Октябрь</div>

      <div class="weekdays">
        <span v-for="w in WEEKDAYS" :key="w" :class="{ weekend: w === 'Сб' || w === 'Вс' }">{{ w }}</span>
      </div>

      <div class="days">
        <span v-for="i in OFFSET" :key="'e'+i" class="day empty" />
        <button
            v-for="day in DAYS"
            :key="day"
            class="day"
            :class="{
            selected: selectedDay === day,
            weekend:  isWeekend(day) && selectedDay !== day,
          }"
            @click="selectDay(day)"
        >{{ day }}</button>
      </div>
    </div>

    <Transition name="slide">
      <div v-if="selectedDay" class="time-section">
        <div class="time-row">
          <label>Время</label>
          <div class="selects">
            <select v-model="selectedHour" @change="save">
              <option v-for="h in HOURS" :key="h" :value="h">{{ String(h).padStart(2,'0') }}</option>
            </select>
            <span class="colon">:</span>
            <select v-model="selectedMin" @change="save">
              <option value="00">00</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>

        <div class="dur-row">
          <label>Продолжительность</label>
          <div class="dur-pills">
            <button
                v-for="h in allowedDurations"
                :key="h"
                class="dur-btn"
                :class="{ active: selectedDur === h }"
                @click="selectDur(h)"
            >{{ h + ' ч' }}</button>
          </div>
        </div>
      </div>
    </Transition>

</template>

<style scoped>

.calendar {
  background: #fff;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: 16px 12px 12px;
}

.cal-title {
  text-align: center;
  font-size: 15px;
  font-weight: 500;
  color: #1a1a1a;
  margin-bottom: 12px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, calc(100% / 7));
  margin-bottom: 4px;
}
.weekdays span {
  text-align: center;
  font-size: 12px;
  color: #bbb;
  font-weight: 500;
  padding: 2px 0;
}
.weekdays .weekend { color: #e57373; }

.days {
  display: grid;
  grid-template-columns: repeat(7, calc(100% / 7));
}

.day {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #1a1a1a;
  cursor: pointer;
  border: none;
  background: none;
  transition: background 0.15s, color 0.15s, transform 0.15s cubic-bezier(.34,1.56,.64,1);
  padding: 20px;
  z-index: 10;
}
.day.empty { cursor: default; pointer-events: none; }
.day:hover:not(.empty):not(.selected) {
  background: var(--hover-color);
  color: #4f7ef8;
  transform: scale(1.12);
}
.day:active:not(.empty) {
  transform: scale(0.9);
}
.day.selected {
  background: #4f7ef8;
  color: #fff;
  transform: scale(1.06);
  z-index: 5;
}
.day.weekend { color: #e57373; }

.time-section {
  background: #fff;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.time-row, .dur-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.time-row label, .dur-row label {
  font-size: 12px;
  color: #aaa;
  font-weight: 500;
}

.selects {
  display: flex;
  align-items: center;
  gap: 8px;
}
.selects select {
  flex: 1;
  height: 36px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: #f7f7f5;
  color: #1a1a1a;
  font-size: 14px;
  font-family: inherit;
  padding: 0 8px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s;
}
.selects select:focus { border-color: #4f7ef8; }
.colon { font-size: 18px; color: #bbb; }

.dur-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.dur-btn {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: #f7f7f5;
  color: #555;
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s, transform 0.13s cubic-bezier(.34,1.56,.64,1);
}

.dur-btn:hover {
  background: var(--hover-color);
  color: #4f7ef8;
  border-color: #c5d4fd;
  transform: scale(1.06);
}
.dur-btn:active { transform: scale(0.93); }
.dur-btn.active {
  background: #eef2ff;
  color: #4f7ef8;
  border-color: #c5d4fd;
}

.slide-enter-active { transition: all 0.3s cubic-bezier(.34,1.56,.64,1); }
.slide-leave-active { transition: all 0.2s ease; }
.slide-enter-from  { opacity: 0; transform: translateY(10px); }
.slide-leave-to    { opacity: 0; transform: translateY(6px); }

@media (max-width: 380px) {
  .day { font-size: 12px; }
  .dur-btn { font-size: 12px; padding: 5px 10px; }
}
</style>