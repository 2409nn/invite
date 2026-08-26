import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Явно типизируем массив маршрутов
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'first',
        component: () => import('./views/first.vue')
    },
    {
        path: '/last',
        name: 'last',
        component: () => import('./views/last.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router