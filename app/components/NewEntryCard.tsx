'use client'
import React from 'react'
import { createNewEntry } from '../libs/api'
import { useRouter } from 'next/navigation'

const NewEntryCard = () => {
  const router = useRouter()
  const handleOnClick = async () => {
    const entry = await createNewEntry()
    router.push(`/journal/${entry._id}`)
  }

  return (
    <div className="bg-slate-200 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200">
      <div className="pb-52 px-4 pt-4" onClick={handleOnClick}>
        New Entry
      </div>
    </div>
  )
}

export default NewEntryCard
