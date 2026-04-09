'use client'

import { Suspense } from 'react'
import Spline from '@splinetool/react-spline/next'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-full border-2 border-transparent animate-spin"
              style={{ borderTopColor: "#c3e41d" }}
            />
            <div
              className="absolute inset-2 rounded-full border-2 border-transparent"
              style={{
                borderTopColor: "#8b5cf6",
                animation: "spin 0.8s linear infinite reverse",
              }}
            />
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
