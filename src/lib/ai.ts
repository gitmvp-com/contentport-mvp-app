import { TweetIdea } from './types'
const TWEET_IDEAS: TweetIdea[] = [
  { title: 'Behind the Scenes', description: 'Just shipped a new feature that took 2 weeks of debugging. Coffee count: 47.' },
  { title: 'Hot Take', description: "The best code is the code you don't have to write. Refactoring is underrated 🚀" },
  { title: 'Share Knowledge', description: 'TIL that you can use CSS Grid gaps to replace margin hacks. My old code is shook 👀' },
  { title: 'Motivational', description: "Don't compare your chapter 1 to someone else's chapter 20. Every expert was once a beginner." },
  { title: 'Tutorial', description: 'Just wrote a deep dive on Zustand vs Redux. No boilerplate, just pure state management joy. Link in bio 📚' },
  { title: 'Humor', description: "My code works on my machine, so I've technically shipped it to production. It's called agile 😅" },
  { title: 'Question', description: 'What\'s the most surprising thing you learned about web development this year? I\'ll go first...' },
  { title: 'Appreciation', description: 'Thankful for open source maintainers. You literally carry the internet on your shoulders. 🙏' },
]
export async function generateTweetIdeas(_prompt?: string): Promise<TweetIdea[]> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const shuffled = [...TWEET_IDEAS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3)
}