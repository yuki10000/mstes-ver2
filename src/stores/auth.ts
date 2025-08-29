import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth } from '@/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 認証状態の監視
  onAuthStateChanged(auth, (u) => {
    user.value = u
  })

  // ログイン
  const login = async (email: string, password: string) => {
    loading.value = true
    error.value = null
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      user.value = cred.user
    } catch {
      error.value = 'ログインに失敗しました。メールアドレスまたはパスワードが正しいか確認してください'
    } finally {
      loading.value = false
    }
  }

  // ログアウト
  const logout = async () => {
    await signOut(auth)
    user.value = null
  }

  return { user, loading, error, login, logout }
})
