'use client'
import { useAuthStore } from '@/lib/store'
import { LoginPage } from '@/components/auth/login-page'
import { Dashboard } from '@/components/dashboard/dashboard'
export default function Home() {
  const { user } = useAuthStore()
  if (!user) return <LoginPage />
  return <Dashboard />
}