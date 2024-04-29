import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'start',
            component: () => import('@/views/StartView.vue')
        },
        {
            path: '/hjem',
            name: 'home',
            component: () => import('@/views/HomeView.vue')
        },
        {
            path: '/logginn',
            name: 'login',
            component: () => import('@/views/RegisterLoginView.vue')
        },
        {
            path: '/logginn/:username',
            name: 'login-bio',
            component: () => import('@/views/BiometricLoginView.vue')
        },
        {
            path: '/registrer',
            name: 'register',
            component: () => import('@/views/RegisterLoginView.vue')
        },
        {
            path: '/forgotPassword',
            name: 'resetPassword',
            component: () => import('@/views/ResetPasswordView.vue')
        },
        {
            path: '/profil',
            name: 'profile',
            component: () => import('@/views/ViewProfileView.vue')
        },
        {
            path: '/profil/rediger',
            name: 'edit-profile',
            component: () => import('@/views/ManageProfileView.vue')
        },
        {
            path: '/sparemaal',
            name: 'goals',
            component: () => import('@/views/UserGoalsView.vue')
        },
        {
            path: '/sparemaal/rediger/ny',
            name: 'new-goal',
            component: () => import('@/views/ManageGoalView.vue')
        },
        {
            path: '/sparemaal/rediger/:id',
            name: 'edit-goal',
            component: () => import('@/views/ManageGoalView.vue')
        },
        {
            path: '/sparemaal/oversikt/:id',
            name: 'view-goal',
            component: () => import('@/views/ViewGoalView.vue')
        },
        {
            path: '/spareutfordringer',
            name: 'challenges',
            component: () => import('@/views/UserChallengesView.vue')
        },
        {
            path: '/spareutfordringer/ny',
            name: 'new-challenge',
            component: () => import('@/views/ManageChallengeView.vue')
        },
        {
            path: '/spareutfordringer/rediger/:id',
            name: 'edit-challenge',
            component: () => import('@/views/ManageChallengeView.vue')
        },
        {
            path: '/spareutfordringer/oversikt/:id',
            name: 'view-challenge',
            component: () => import('@/views/ViewChallengeView.vue')
        },
        {
            path: '/konfigurasjonSteg1',
            name: 'configurations1',
            component: () => import('@/views/ConfigHabitChangeView.vue')
        },
        {
            path: '/konfigurasjonSteg2',
            name: 'configurations2',
            component: () => import('@/views/ConfigFamiliarWithSavingsView.vue')
        },
        {
            path: '/konfigurasjonSteg3',
            name: 'configurations3',
            component: () => import('@/views/ConfigSpendingItemsView.vue')
        },
        {
            path: '/konfigurasjonSteg4',
            name: 'configurations4',
            component: () => import('@/views/ConfigSpendingItemsAmountView.vue')
        },
        {
            path: '/konfigurasjonSteg5',
            name: 'configurations5',
            component: () => import('@/views/ConfigSpendingItemsTotalAmountView.vue')
        },
        {
            path: '/konfigurasjonSteg6',
            name: 'configurations6',
            component: () => import('@/views/ConfigAccountNumberView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/NotFoundView.vue')
        },
        {
            path: '/addAlternativeLogin',
            name: 'addAlternativeLogin',
            component: () => import('@/views/AddAlternativeLogin.vue')
        }
    ],
    scrollBehavior() {
        return { top: 0 }
    }
})

router.beforeEach((to, from, next) => {
    const publicPages = [
        { name: 'login' },
        { name: 'register' },
        { name: 'login-bio' },
        { name: 'resetPassword' },
        { name: 'start' }
    ]

    const authRequired = !publicPages.some((page) => page.name === to.name)
    const loggedIn = sessionStorage.getItem('accessToken')
    const loginToken = localStorage.getItem('loginToken')

    if (authRequired && !loggedIn && !loginToken) {
        return next({ name: 'login' })
    }
    next()
})

export default router
