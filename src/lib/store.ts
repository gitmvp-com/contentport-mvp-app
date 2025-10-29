import { create } from 'zustand'
import { Tweet, User } from './types'
interface AuthState {
  user: User | null
  login: (email: string) => void
  logout: () => void
}
interface TweetState {
  tweets: Tweet[]
  addTweet: (tweet: Tweet) => void
  removeTweet: (id: string) => void
}
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (email: string) => set({
    user: {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      createdAt: new Date(),
    },
  }),
  logout: () => set({ user: null }),
}))
export const useTweetStore = create<TweetState>((set) => ({
  tweets: [],
  addTweet: (tweet: Tweet) => set((state) => ({ tweets: [tweet, ...state.tweets] })),
  removeTweet: (id: string) => set((state) => ({ tweets: state.tweets.filter((t) => t.id !== id) })),
}))