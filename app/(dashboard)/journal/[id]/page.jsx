import Editor from '@/app/components/Editor'
import getUserByClerkId from '@/app/libs/auth'
import { JournalEntryModel } from '@/app/models/Ad'
import React from 'react'

const getEntry = async (id) => {
  const user = await getUserByClerkId()
  const entry = await JournalEntryModel.findOne({
    _id: id,
    userId: user?._id,
  })
    .populate('analysis')
    .lean()

  if (!entry) {
    return null
  }

  return {
    ...entry,
    _id: entry._id.toString(),
    userId: entry.userId.toString(),
    createdAt: entry.createdAt?.toISOString(),
    updatedAt: entry.updatedAt?.toISOString(),
  }
}

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id)
  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage
