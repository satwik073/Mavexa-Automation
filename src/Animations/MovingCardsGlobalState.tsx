'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
// import useMediaQuery from '@mui/material/useMediaQuery';
export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  // speed = 'slow',
  pauseOnHover = true,
  className,
}: {
  items: {
    href: string
  }[]
  direction?: 'left' | 'right'
  speed?:  'slow'
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)
  // const matches = useMediaQuery('(max-width:600px)');
  
  
  const [start, setStart] = useState(false)
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children)

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem)
        }
      })

      getDirection()
      getSpeed()
      setStart(true)
    }
  }
  useEffect(() => {
    addAnimation()
  }, [addAnimation])
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'forwards'
        )
      } else {
        containerRef.current.style.setProperty(
          '--animation-direction',
          'reverse'
        )
      }
    }
  }
  const getSpeed = () => {
    if (containerRef.current) {
     
        containerRef.current.style.setProperty('--animation-duration', '80s')
    }
  }
  console.log(items)
  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20  w-full overflow-hidden md:mt-0 mt-20 bg-transparent',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          ' flex min-w-full shrink-0 gap-10 py-4 w-max flex-nowrap',
          start && 'animate-scroll ',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item) => (
          <Image
            width={90}
            height={1}
            src={item.href}
            alt={item.href}
            className=" relative rounded-2xl  text-black object-contain"
            key={item.href}
          />
        ))}
      </ul>
    </div>
  )
}