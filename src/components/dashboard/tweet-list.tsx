'use client'
import { Tweet } from '@/lib/types'
import { useTweetStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { formatDate } from '@/lib/utils'
import { Trash2, CheckCircle, Clock } from 'lucide-react'
import toast from 'react-hot-toast'
export function TweetList({ tweets }: { tweets: Tweet[] }) {
  const { removeTweet } = useTweetStore()
  const sortedTweets = [...tweets].sort((a, b) => {
    if (!a.scheduledAt && !b.scheduledAt) return 0
    if (!a.scheduledAt) return 1
    if (!b.scheduledAt) return -1
    return new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
  })
  return (
    <div className="space-y-3">
      {sortedTweets.map((tweet) => (
        <Card key={tweet.id} className="p-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm leading-relaxed flex-1 whitespace-pre-wrap">{tweet.content}</p>
              <Button variant="ghost" size="sm" onClick={() => { removeTweet(tweet.id); toast.success('Tweet deleted') }} className="text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
            </div>
            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">{tweet.scheduledAt ? (<><Clock className="w-3 h-3" /><span>Scheduled for {formatDate(new Date(tweet.scheduledAt))}</span></>) : (<><CheckCircle className="w-3 h-3" /><span>Draft</span></>)}</div>
              <span>{tweet.content.length} characters</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}