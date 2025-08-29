import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../pages/HomeView.vue'),
      meta: { title: 'ホーム' },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../pages/LoginView.vue'),
      meta: { title: 'ログイン' },
    },
    {
      path: '/exercise/:roomId',
      name: 'Exercise',
      component: () => import('../pages/ExerciseView.vue'),
      meta: { title: '演習' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../pages/NotFound.vue'),
      meta: { title: 'ページが見つかりません' },
    },
  ],
})

let isAuthChecked = false
let authUser: User | null = null
const waitForAuth = () => {
  return new Promise((resolve) => {
    if (isAuthChecked) {
      resolve(authUser)
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        isAuthChecked = true
        authUser = user
        unsubscribe()
        resolve(user)
      })
    }
  })
}

// ページタイトルを動的に変更 & 認証ガード
router.beforeEach(async (to, from, next) => {
  const baseTitle = '段階的翻訳演習'
  if (to.meta && to.meta.title) {
    document.title = `${baseTitle} | ${to.meta.title}`
  } else {
    document.title = baseTitle
  }

  // ログイン不要なページ
  const publicPages = ['/login']
  const requiresAuth = !publicPages.includes(to.path)
  const user = await waitForAuth()

  if (requiresAuth && !user) {
    return next({ name: 'Login' })
  }
  next()
})

export default router
