import EntryCard from '@/app/components/EntryCard'
import NewEntryCard from '@/app/components/NewEntryCard'
import Question from '@/app/components/Question'
import { analyze } from '@/app/libs/ai'
import getUserByClerkId from '@/app/libs/auth'
import { connectionDB } from '@/app/libs/connectionDB'
import { JournalEntryModel } from '@/app/models/Ad'
import Link from 'next/link'
import React from 'react'

const getAllEntries = async () => {
  await connectionDB()
  const user = await getUserByClerkId()
  const entries = await JournalEntryModel.find({
    userId: user?.id,
  }).sort({ createdAt: -1 })

  return entries
}

const JournalPage = async () => {
  const entries = await getAllEntries()
  return (
    <div className="px-10 py-5">
      <h2 className="text-xl font-semibold mb-5">Journal</h2>
      <Question />
      <div className="grid grid-cols-4 gap-x-4 gap-y-2">
        <div className="h-[250px]">
          <NewEntryCard />
        </div>
        {entries.map((entry) => (
          <Link href={`/journal/${entry._id}`} key={entry.id}>
            <div className="h-[250px]">
              <EntryCard key={entry.id} entry={entry} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default JournalPage
