import getUserByClerkId from '@/app/libs/auth'
import { AnalysisModel, JournalEntryModel } from '@/app/models/Ad'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
  const user = await getUserByClerkId()
  const data = await req.json()

  const entry = await JournalEntryModel.create({
    userId: user?._id,
    content: data.content,
  })

  const analysis = await AnalysisModel.create({
    mood: 'Neutral',
    subject: 'None',
    negative: false,
    summary: 'None',
    sentimentScore: 0,
    color: '#FFFFFF',
    userId: user.id,
    entryId: entry._id,
  })

  const populatedEntry = await JournalEntryModel.findById(entry._id).populate(
    'analysis'
  )

  revalidatePath('/journal')
  return NextResponse.json({ entry: populatedEntry })
}
