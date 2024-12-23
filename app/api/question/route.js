import { qa } from '@/app/libs/ai'
import getUserByClerkId from '@/app/libs/auth'
import { JournalEntryModel } from '@/app/models/Ad'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  const { question } = await req.json()
  console.log(question)
  const user = await getUserByClerkId()

  const entries = await JournalEntryModel.find({
    userId: user?._id,
  }).select('content createdAt')

  const answer = await qa(question, entries)
  return NextResponse.json({ data: answer })
}
