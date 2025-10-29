'use client'
import { User } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogOut, Settings } from 'lucide-react'
export function Header({ user, onLogout }: { user: User | null; onLogout: () => void }) {
  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
        <div><h1 className="font-bold text-lg">✨ ContentPort</h1><p className="text-xs text-muted-foreground">AI Tweet Generator MVP</p></div>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild><Button variant="ghost" size="sm">{user.name} →</Button></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled><span className="text-xs text-muted-foreground">{user.email}</span></DropdownMenuItem>
              <DropdownMenuItem><Settings className="w-4 h-4 mr-2" />Settings (disabled)</DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout} className="text-destructive"><LogOut className="w-4 h-4 mr-2" />Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}