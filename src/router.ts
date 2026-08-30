import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Явно типизируем массив маршрутов
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'first',
        component: () => import('./views/first.vue')
    },
    {
        path: '/place',
        name: 'place',
        component: () => import('./views/place.vue'),
    },
    {
        path: '/date',
        name: 'date',
        component: () => import('./views/date.vue'),
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