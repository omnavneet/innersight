import { analyze } from '@/app/libs/ai'
import getUserByClerkId from '@/app/libs/auth'
import { AnalysisModel, JournalEntryModel } from '@/app/models/Ad'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const PATCH = async (req, { params }) => {
  const { content } = await req.json()
  const user = await getUserByClerkId()

  const updatedEntry = await JournalEntryModel.findOneAndUpdate(
    {
      _id: params.id,
      userId: user?._id,
    },
    {
      $set: { content },
    },
    { new: true }
  )

  const analysis = await analyze(updatedEntry?.content)

  const savedAnalysis = await AnalysisModel.findOneAndUpdate(
    {
      userId: user?._id,
      entryId: updatedEntry?._id,
    },
    {
      $set: { ...analysis, entryId: updatedEntry?._id, userId: user?.id },
    },
    { new: true, upsert: true }
  )

  revalidatePath('/journal')
  return NextResponse.json({
    data: {
      ...updatedEntry,
      analysis: savedAnalysis,
    },
  })
}
