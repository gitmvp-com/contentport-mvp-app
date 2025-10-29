'use client'
import { useState } from 'react'
import { useTweetStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { TweetEditor } from '@/components/composer/tweet-editor'
import { ScheduleForm } from '@/components/composer/schedule-form'
import { IdeasPanel } from '@/components/composer/ideas-panel'
import { generateId } from '@/lib/utils'
import toast from 'react-hot-toast'
export function TweetComposer({ onClose }: { onClose: () => void }) {
  const [content, setContent] = useState('')
  const [scheduledAt, setScheduledAt] = useState<Date | null>(null)
  const [showSchedule, setShowSchedule] = useState(false)
  const [showIdeas, setShowIdeas] = useState(false)
  const { addTweet } = useTweetStore()
  const handlePublish = () => {
    if (!content.trim()) { toast.error('Please write something!'); return }
    addTweet({
      id: generateId(),
      content: content.trim(),
      scheduledAt,
      createdAt: new Date(),
      status: scheduledAt ? 'scheduled' : 'draft',
    })
    toast.success(scheduledAt ? `Tweet scheduled for ${scheduledAt.toLocaleDateString()}` : 'Tweet saved as draft')
    onClose()
  }
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="space-y-4">
          <div><label className="text-sm font-medium mb-2 block">What's on your mind?</label><TweetEditor value={content} onChange={setContent} /></div>
          <div className="flex justify-between items-center text-xs text-muted-foreground"><span>{content.length} characters</span><span className={content.length > 280 ? 'text-destructive' : ''}>{280 - content.length} remaining</span></div>
          <div className="flex gap-2 flex-wrap"><Button variant="outline" onClick={() => setShowIdeas(!showIdeas)}>✨ Get Ideas</Button><Button variant="outline" onClick={() => setShowSchedule(!showSchedule)}>📅 {scheduledAt ? 'Change Date' : 'Schedule'}</Button><Button variant="outline" onClick={onClose}>Cancel</Button><Button onClick={handlePublish} disabled={!content.trim()} className="ml-auto">{scheduledAt ? 'Schedule Tweet' : 'Save Draft'}</Button></div>
          {showSchedule && (
            <div className="border-t pt-4"><ScheduleForm value={scheduledAt} onChange={setScheduledAt} onClose={() => setShowSchedule(false)} /></div>
          )}
        </div>
      </Card>
      {showIdeas && <IdeasPanel onInsertIdea={(idea) => {
        setContent((prev) => (prev ? prev + '\n\n' + idea : idea))
        setShowIdeas(false)
      }} />}
    </div>
  )
}