import { createRouter, createWebHistory } from 'vue-router'


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
      path: '/exercise',
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

// ページタイトルを動的に変更
router.beforeEach((to, from, next) => {
  const baseTitle = '段階的翻訳演習';
  if (to.meta && to.meta.title) {
    document.title = `${baseTitle} | ${to.meta.title}`;
  } else {
    document.title = baseTitle;
  }
  next();
});

export default router
