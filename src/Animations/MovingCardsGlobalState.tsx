'use client'

import { ThemeProviderOptions } from '@/Global/GlobalSiteNavigators/NavigationState/Constants/structure'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import img from 'next/image'
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

  return (
    <div
    ref={containerRef}
    className={cn(
      'scroller relative z-20  w-full overflow-hidden  [mask-image:linear-gradient(to_right,white_100%,transparent,transparent,white_10%)]  dark:[mask-image:linear-gradient(to_right,transparent,black_100%,black_100%,transparent)]',
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
      {items.map((item, idx) => (
        <img
          width={120}
          height={1}
          src={item.href}
          alt={item.href}
          className=" relative rounded-2xl  object-contain opacity-50"
          key={item.href}
        />
      ))}
    </ul>
  </div>
  )
}