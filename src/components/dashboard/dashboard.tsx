'use client'
import { useState } from 'react'
import { useAuthStore, useTweetStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { TweetComposer } from '@/components/composer/tweet-composer'
import { TweetList } from '@/components/dashboard/tweet-list'
import { Header } from '@/components/layout/header'
export function Dashboard() {
  const [showComposer, setShowComposer] = useState(false)
  const { user, logout } = useAuthStore()
  const { tweets } = useTweetStore()
  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={logout} />
      <main className="max-w-2xl mx-auto p-4 space-y-6">
        {showComposer ? (
          <TweetComposer onClose={() => setShowComposer(false)} />
        ) : (
          <Button onClick={() => setShowComposer(true)} size="lg" className="w-full">✨ Create New Tweet</Button>
        )}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Tweets ({tweets.length})</h2>
          {tweets.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground"><p>No tweets yet. Create your first one!</p></div>
          ) : (
            <TweetList tweets={tweets} />
          )}
        </div>
      </main>
    </div>
  )
}