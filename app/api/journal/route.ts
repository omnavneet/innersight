import { analyze } from '@/app/libs/ai'
import getUserByClerkId from '@/app/libs/auth'
import { AnalysisModel, JournalEntryModel } from '@/app/models/Ad'
import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserByClerkId()
  const entry = await JournalEntryModel.create({
    userId: user?._id,
    content: 'hello world',
  })

  const analysis = await analyze(entry.content)
  await AnalysisModel.create({
    userId: user?._id,
    entryId: entry._id,
    ...analysis,
  })

  revalidatePath('/journal')
  return NextResponse.json({ entry })
}
