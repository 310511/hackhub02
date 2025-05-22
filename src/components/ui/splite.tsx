//@ts-nocheck

'use client'

import { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      {
        root: null,
        rootMargin: '200px', // Load 200px before entering viewport
        threshold: 0.1
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`relative h-[600px] w-full ${className}`} // Set explicit dimensions
      style={{ minHeight: '400px' }} // Prevent layout shift
    >
      {loading && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100/10">
          <div className="loader animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent" />
        </div>
      )}
      
      {inView && (
        <Spline
          scene={scene}
          onLoad={() => {
            console.log('Spline scene loaded')
            setLoading(false)
          }}
          onError={(error) => {
            console.error('Spline error:', error)
            setLoading(false)
          }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
      )}
    </div>
  )
}