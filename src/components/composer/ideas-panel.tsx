'use client'
import { useState } from 'react'
import { generateTweetIdeas } from '@/lib/ai'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, Lightbulb } from 'lucide-react'
export function IdeasPanel({ onInsertIdea }: { onInsertIdea: (idea: string) => void }) {
  const [ideas, setIdeas] = useState<Array<{ title: string; description: string }> | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const handleGenerateIdeas = async () => {
    setIsLoading(true)
    const generated = await generateTweetIdeas()
    setIdeas(generated)
    setIsLoading(false)
  }
  if (!ideas) {
    return (
      <Card className="p-4 border-2 border-dashed">
        <div className="flex items-center gap-3"><Lightbulb className="w-5 h-5 text-yellow-500" /><div className="flex-1"><p className="text-sm font-medium">Get AI-powered tweet ideas</p><p className="text-xs text-muted-foreground">Get 3 random ideas to inspire your tweet</p></div><Button onClick={handleGenerateIdeas} disabled={isLoading} size="sm">{isLoading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Thinking...</>) : 'Generate'}</Button></div>
      </Card>
    )
  }
  return (
    <div className="space-y-2">
      {ideas.map((idea, index) => (
        <Card key={index} className="p-4 cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="flex items-start justify-between gap-2"><div className="flex-1"><p className="font-medium text-sm">{idea.title}</p><p className="text-sm text-muted-foreground">{idea.description}</p></div><Button size="sm" variant="ghost" onClick={() => onInsertIdea(idea.description)}>Use</Button></div>
        </Card>
      ))}
      <Button variant="outline" onClick={() => setIdeas(null)} className="w-full">Get More Ideas</Button>
    </div>
  )
}