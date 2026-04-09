"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Card {
  id: number
  contentType: 1 | 2 | 3
}

const cardData = {
  1: {
    title: "HireWise",
    description: "Remote interview platform with Secure Auth, Video (Stream), Live Collaborative Editor & AI Copilot",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2670&auto=format&fit=crop",
  },
  2: {
    title: "Ghummakad Yatri",
    description: "Travel booking platform with secure login, Razorpay and role-based dashboards",
    image: "https://images.unsplash.com/photo-1463123081488-789f998ac9c4?q=80&w=2670&auto=format&fit=crop",
  },
  3: {
    title: "Ingen Tech API",
    description: "Multi-collection MongoDB data operations with AWS S3 Scalable Processing",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop",
  },
}

const initialCards: Card[] = [
  { id: 1, contentType: 1 },
  { id: 2, contentType: 2 },
  { id: 3, contentType: 3 },
]

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
]

const exitAnimation = {
  y: 340,
  scale: 1,
  zIndex: 10,
}

const enterAnimation = {
  y: -16,
  scale: 0.9,
}

function CardContent({ contentType }: { contentType: 1 | 2 | 3 }) {
  const data = cardData[contentType]

  return (
    <div className="flex h-full w-full flex-col gap-4 bg-black/60 backdrop-blur border border-white/5">
      <div className="-outline-offset-1 flex h-[200px] w-full items-center justify-center overflow-hidden rounded-t-xl outline outline-black/10 dark:outline-white/10">
        <img
          src={data.image || "/placeholder.svg"}
          alt={data.title}
          className="h-full w-full select-none object-cover opacity-80"
        />
      </div>
      <div className="flex w-full items-center justify-between gap-2 px-3 pb-6">
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate font-bold text-white text-lg">{data.title}</span>
          <span className="text-white/60 text-sm truncate">{data.description}</span>
        </div>
        <button className="flex h-10 shrink-0 cursor-pointer select-none items-center gap-0.5 rounded-full bg-white text-black pl-4 pr-3 text-sm font-bold shadow-lg">
          View
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
            className="ml-1"
          >
            <path d="M9.5 18L15.5 12L9.5 6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function AnimatedCard({
  card,
  index,
  isAnimating,
}: {
  card: Card
  index: number
  isAnimating: boolean
}) {
  const { scale, y } = positionStyles[index] ?? positionStyles[2]
  const zIndex = index === 0 && isAnimating ? 10 : 3 - index

  const exitAnim = index === 0 ? exitAnimation : undefined
  const initialAnim = index === 2 ? enterAnimation : undefined

  return (
    <motion.div
      key={card.id}
      initial={initialAnim}
      animate={{ y, scale }}
      exit={exitAnim}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0,
      }}
      style={{
        zIndex,
        left: "50%",
        x: "-50%",
        bottom: 0,
      }}
      className="absolute flex h-[280px] w-[324px] items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/80 shadow-2xl will-change-transform sm:w-[512px]"
    >
      <CardContent contentType={card.contentType} />
    </motion.div>
  )
}

export default function AnimatedCardStack() {
  const [cards, setCards] = useState(initialCards)
  const [isAnimating, setIsAnimating] = useState(false)
  const [nextId, setNextId] = useState(4)

  const handleAnimate = () => {
    setIsAnimating(true)
    const nextContentType = ((cards[2].contentType % 3) + 1) as 1 | 2 | 3
    setCards([...cards.slice(1), { id: nextId, contentType: nextContentType }])
    setNextId((prev) => prev + 1)
    setIsAnimating(false)
  }

  return (
    <div className="flex w-full flex-col items-center justify-center pt-2">
      <div className="relative h-[380px] w-full overflow-hidden sm:w-[644px]">
        <AnimatePresence initial={false}>
          {cards.slice(0, 3).map((card, index) => (
            <AnimatedCard key={card.id} card={card} index={index} isAnimating={isAnimating} />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 w-full flex items-center justify-center">
        <button
          onClick={handleAnimate}
          className="flex h-10 px-6 cursor-pointer select-none items-center justify-center gap-1 rounded-full border border-white/20 bg-white/5 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
        >
          Next Project
        </button>
      </div>
    </div>
  )
}
