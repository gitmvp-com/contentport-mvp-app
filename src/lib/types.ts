export interface User {
  id: string
  email: string
  name: string
  createdAt: Date
}
export interface Tweet {
  id: string
  content: string
  scheduledAt: Date | null
  createdAt: Date
  status: 'draft' | 'scheduled' | 'posted'
}
export interface TweetIdea {
  title: string
  description: string
}