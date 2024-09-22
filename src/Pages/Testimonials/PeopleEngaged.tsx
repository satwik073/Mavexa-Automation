// import React from 'react'
import { InfiniteMovingCards } from '@/Animations/MovingCardsGlobalState'
import { clients } from '@/lib/constants'
// type Props = {}

const PeopleEngaged = () => {
  return (
    <div>
        
    <div className="px-8">
        <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
        Loved by people all over the universe
        </h4>

        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
        Every AI is used by millions of people around the globe.Our APIs have fan bases and people fight for us over twitter.
        </p>
      </div>
      <InfiniteMovingCards
        items={clients}
        className=" w-full"
        pauseOnHover
        direction="right"
        speed="slow"
      />
    </div>
  )
}

export default PeopleEngaged