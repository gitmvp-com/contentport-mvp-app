'use client'
import { useState } from 'react'
import { useAuthStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import toast from 'react-hot-toast'
export function LoginPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) { toast.error('Please enter an email'); return }
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    login(email)
    toast.success(`Welcome, ${email}!`)
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold">ContentPort</CardTitle>
          <CardDescription>AI-Powered Tweet Generator</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email (any email works!)</label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4 text-center">This is a demo. No real authentication required. Enter any email to get started!</p>
        </CardContent>
      </Card>
    </div>
  )
}