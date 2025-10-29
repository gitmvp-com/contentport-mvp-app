'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
export function ScheduleForm({ value, onChange, onClose }: { value: Date | null; onChange: (date: Date | null) => void; onClose: () => void }) {
  const [date, setDate] = useState(value?.toISOString().split('T')[0] || '')
  const [time, setTime] = useState(value ? value.getHours().toString().padStart(2, '0') + ':' + value.getMinutes().toString().padStart(2, '0') : '09:00')
  const handleSchedule = () => {
    if (!date) return
    const [hours, minutes] = time.split(':')
    const scheduledDate = new Date(date)
    scheduledDate.setHours(parseInt(hours), parseInt(minutes), 0, 0)
    onChange(scheduledDate)
    onClose()
  }
  return (
    <Card className="p-4 bg-muted/50">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2"><label className="text-sm font-medium">Date</label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Time</label><Input type="time" value={time} onChange={(e) => setTime(e.target.value)} /></div>
        </div>
        <div className="flex gap-2"><Button onClick={handleSchedule} disabled={!date} className="flex-1">Set Schedule</Button><Button variant="outline" onClick={() => onChange(null)}>Clear</Button></div>
        {value && <p className="text-xs text-muted-foreground">Scheduled for {value.toLocaleString()}</p>}
      </div>
    </Card>
  )
}