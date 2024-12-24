'use client'
import React from 'react'
import { createNewEntry } from '../libs/api'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const NewEntryCard = () => {
  const router = useRouter()
  const handleOnClick = async () => {
    const entry = await createNewEntry()
    router.push(`/journal/${entry._id}`)
  }

  return (
    <div className="bg-gray-300 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200 h-full text-2xl justify-center items-center flex">
      <div className="px-4" onClick={handleOnClick}>
        New Entry
      </div>
      <div className="flex items-center justify-center">
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  )
}

export default NewEntryCard
