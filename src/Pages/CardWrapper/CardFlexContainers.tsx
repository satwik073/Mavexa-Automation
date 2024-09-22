
import { CardBody, CardContainer, CardItem } from '@/Animations/3DGlobalCard'
import { FaCheck } from 'react-icons/fa'


const CardContainers = () => {
  return (
    <section className="">
    {/* <LampContained/> */}
    <section className=" flex-wrap items-center justify-center flex-col md:flex-row gap-8 mt-20 ">
    <div className="px-8">
    <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
    Plans that suites most of the people
    </h4>

    <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
    Every AI is used by millions of people around the globe.Our APIs have fan bases and people fight for us over twitter.
    </p>
  </div>
  
  <div className="flex items-center justify-center gap-4">
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-5 p-4">
    {/* Hobby Plan */}
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black hover:border-emerald-500 border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-900 dark:text-white"
        >
          Hobby
          <h2 className="text-6xl">$0</h2>
        </CardItem>
        <CardItem
          translateZ="60"
          className="text-zinc-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Get a glimpse of what our software is capable of. Just a heads up
          {"you'll"} never leave us after this!
          <ul className="my-4 flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <FaCheck /> 3 Free automations
            </li>
            <li className="flex items-center gap-2">
              <FaCheck /> 100 tasks per month
            </li>
            <li className="flex items-center gap-2">
              <FaCheck /> Two-step Actions
            </li>
          </ul>
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Get Started Now
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>

    {/* Pro Plan */}
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black hover:border-emerald-500 border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-900 dark:text-white"
        >
          Pro Plan
          <h2 className="text-6xl">$29</h2>
        </CardItem>
        <CardItem
          translateZ="60"
          className="text-zinc-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Get a glimpse of what our software is capable of. Just a heads up
          {"you'll"} never leave us after this!
          <ul className="my-4 flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <FaCheck /> 3 Free automations
            </li>
            <li className="flex items-center gap-2">
              <FaCheck /> 100 tasks per month
            </li>
            <li className="flex items-center gap-2">
              <FaCheck /> Two-step Actions
            </li>
          </ul>
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Get Started Now
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>

    {/* Unlimited Plan 1 */}
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black hover:border-emerald-500 border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-900 dark:text-white"
        >
          Unlimited
          <h2 className="text-6xl">$99</h2>
        </CardItem>
        <CardItem
          translateZ="60"
          className="text-zinc-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Get a glimpse of what our software is capable of. Just a heads up
          {"you'll"} never leave us after this!
          <ul className="my-4 flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <FaCheck /> 3 Free automations
            </li>
            <li className="flex items-center gap-2">
              <FaCheck /> 100 tasks per month
            </li>
            <li className="flex items-center gap-2">
              <FaCheck /> Two-step Actions
            </li>
          </ul>
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Get Started Now
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>

    {/* Unlimited Plan 2 */}
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black hover:border-emerald-500 border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-900 dark:text-white"
        >
          Unlimited Plus
          <h2 className="text-6xl">$149</h2>
        </CardItem>
        <CardItem
          translateZ="60"
          className="text-zinc-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Get a glimpse of what our software is capable of. Just a heads up
          {"you'll"} never leave us after this!
          <ul className="my-4 flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <FaCheck /> 3 Free automations
            </li>
            <li className="flex items-center gap-2">
              <FaCheck /> 100 tasks per month
            </li>
            <li className="flex items-center gap-2">
              <FaCheck /> Two-step Actions
            </li>
          </ul>
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Get Started Now
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black hover:border-emerald-500 border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-900 dark:text-white"
        >
          Unlimited Pro Plus
          <h2 className="text-6xl">$199</h2>
        </CardItem>
        <CardItem
          translateZ="60"
          className="text-zinc-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Get a glimpse of what our software is capable of. Just a heads up
          {"you'll"} never leave us after this!
          <ul className="my-4 flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <FaCheck /> 3 Free automations
            </li>
            <li className="flex items-center gap-2">
              <FaCheck /> 100 tasks per month
            </li>
            <li className="flex items-center gap-2">
              <FaCheck /> Two-step Actions
            </li>
          </ul>
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Get Started Now
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black hover:border-emerald-500 border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-900 dark:text-white"
        >
          Unlimited Pro Max
          <h2 className="text-6xl">$239</h2>
        </CardItem>
        <CardItem
          translateZ="60"
          className="text-zinc-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Get a glimpse of what our software is capable of. Just a heads up
          {"you'll"} never leave us after this!
          <ul className="my-4 flex flex-col gap-2">
            <li className="flex items-center gap-2">
              <FaCheck /> 3 Free automations
            </li>
            <li className="flex items-center gap-2">
              <FaCheck /> 100 tasks per month
            </li>
            <li className="flex items-center gap-2">
              <FaCheck /> Two-step Actions
            </li>
          </ul>
        </CardItem>
        <div className="flex justify-between items-center mt-8">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Try now →
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Get Started Now
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  </div>
  </div>
  </section>
  </section>
  )
}

export default CardContainers