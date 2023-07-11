import { supermarketSections } from '@/data'
import { getRandomArray } from '@/lib/get-random-array'

export function Loader() {
  const emojis = getRandomArray(
    supermarketSections.map((section) => section.icon),
    3
  )
  return (
    <div className="flex items-center justify-center h-16">
      {emojis.map((emoji, index) => (
        <span
          key={emoji}
          className={`text-2xl animate-bounce ease-in-out duration-75 mx-1`}
          role="img"
          style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
          aria-label="Emoji"
        >
          {emoji}
        </span>
      ))}
    </div>
  )
}
