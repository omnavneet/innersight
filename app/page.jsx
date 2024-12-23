import { currentUser } from '@clerk/nextjs/server'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default async function Home() {
  const user = await currentUser()
  let href = user ? '/journal' : '/new-user'

  return (
    <div className="h-screen bg-[#fff2eb] flex justify-center items-center flex-col text-[#d35400] w-screen px-4 sm:px-8 md:px-16 relative">
      <div className="m-0 p-0 absolute top-2 left-10 hover:scale-105 transition duration-300 transform box">
        <a
          href="https://github.com/omnavneet"
          target="_blank"
          className="mx-6 my-1 scale-125"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} size="3x" />
        </a>
      </div>
      <div className="top-7 right-10 absolute">
        <Link href={href}>
          <button className="px-5 py-2 mb-4 bg-[#d35400] rounded-lg hover:scale-105 transform transition duration-300 font-semibold text-base md:text-lg lg:text-2xl text-[#fff2eb] shadow-2xl shadow-red">
            Get Started
          </button>
        </Link>
      </div>
      <div className="text-center">
        <h1 className="text-6xl md:text-7xl lg:text-8xl mb-2 font-bold">
          INNERSIGHT
        </h1>
        <p className="mb-6 text-sm md:text-md lg:text-lg font-semibold">
          Your AI-powered journal that analyzes moods and visualizes your week!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 -mb-28 mt-10 md:mt-16 lg:mt-16 pb-10 lg:gap-10 md:gap-5 mx-auto font-medium text-sm lg:text-base">
        <p className="h-40 w-[320px] md:h-52 md:w-60 lg:h-56 lg:w-80 rounded-lg bg-[#d35400] text-[#fff2eb] flex items-center px-5 shadow-2xl shadow-red flex-col justify-center">
          <span className="text-[#ffcc00] font-bold">AI Mood Analysis:</span>{' '}
          Innersight uses AI to analyze your journal entries, offering
          personalized insights into your emotional patterns.
        </p>
        <p className="h-40 w-[320px] md:h-52 md:w-60 lg:h-56 lg:w-80 rounded-lg bg-[#d35400] text-[#fff2eb] flex items-center px-5 shadow-2xl shadow-red flex-col justify-center">
          <span className="text-[#ffcc00] font-bold">
            Daily Sentiment Score:
          </span>{' '}
          Track your emotional health with a daily sentiment score that
          highlights trends and triggers in your mood.
        </p>
        <p className="h-40 w-[320px] md:h-52 md:w-60 lg:h-56 lg:w-80 rounded-lg bg-[#d35400] text-[#fff2eb] flex items-center px-5 shadow-2xl shadow-red flex-col justify-center">
          <span className="text-[#ffcc00] font-bold">
            Interactive Reflection:
          </span>{' '}
          Engage with the app by asking questions about your mood, fostering
          deeper self-reflection and awareness.
        </p>
      </div>
    </div>
  )
}
