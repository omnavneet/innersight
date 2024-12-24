import { currentUser } from '@clerk/nextjs/server'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

export default async function Home() {
  const user = await currentUser()
  let href = user ? '/journal' : '/new-user'

  return (
    <div className="bg-[#fff2eb] h-screen">
      <div className="flex justify-between items-center w-full md:px-8 px-2 pt-4">
        <div className="w-10 h-10 md:w-12 md:h-12 hover:scale-105 transition duration-300 transform">
          <a
            href="https://github.com/omnavneet"
            target="_blank"
            className="text-[#d35400]"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} size="3x" />
          </a>
        </div>

        <div className="">
          <Link href={href}>
            <button className="px-6 py-3 bg-[#d35400] rounded-lg text-[#fff2eb] font-semibold text-base md:text-lg lg:text-2xl shadow-2xl shadow-red hover:scale-105 transform transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center flex-col text-[#d35400] w-full px-2 md:px-12 mt-24 md:mt-40 ">
        <div className="text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl mb-2 font-bold">
            INNERSIGHT
          </h1>
          <p className="mb-6 text-sm md:text-md lg:text-lg font-semibold">
            Your AI-powered journal that analyzes moods and visualizes your
            week!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 -mb-28 mt-10 md:mt-16 lg:mt-16 pb-10 lg:gap-10 md:gap-5 mx-auto font-medium text-sm lg:text-base">
          <p className="h-40 w-[320px] md:h-52 md:w-60 lg:h-60 lg:w-80 rounded-lg bg-[#d35400] text-[#fff2eb] flex items-center px-5 shadow-2xl shadow-red flex-col justify-center">
            <span className="text-[#ffcc00] font-bold">AI Mood Analysis:</span>{' '}
            Innersight uses AI to analyze your journal entries, offering
            personalized insights into your emotional patterns.
          </p>
          <p className="h-40 w-[320px] md:h-52 md:w-60 lg:h-60 lg:w-80 rounded-lg bg-[#d35400] text-[#fff2eb] flex items-center px-5 shadow-2xl shadow-red flex-col justify-center">
            <span className="text-[#ffcc00] font-bold">
              Daily Sentiment Score:
            </span>{' '}
            Track your emotional health with a daily sentiment score that
            highlights trends and triggers in your mood.
          </p>
          <p className="h-40 w-[320px] md:h-52 md:w-60 lg:h-60 lg:w-80 rounded-lg bg-[#d35400] text-[#fff2eb] flex items-center px-5 shadow-2xl shadow-red flex-col justify-center">
            <span className="text-[#ffcc00] font-bold">
              Interactive Reflection:
            </span>{' '}
            Engage with the app by asking questions about your mood, fostering
            deeper self-reflection and awareness.
          </p>
        </div>
      </div>
    </div>
  )
}
