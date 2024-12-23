import HistoryChart from '@/app/components/HistoryChart'
import getUserByClerkId from '@/app/libs/auth'
import { AnalysisModel } from '@/app/models/Ad'
import React from 'react'

const getData = async () => {
  const user = await getUserByClerkId()
  const analyses = await AnalysisModel.find({
    userId: user?._id,
  })

  const sum = analyses.reduce((all, curr) => all + curr.sentimentScore, 0)
  const avg = Math.round(sum / analyses.length)
  return { analyses, avg }
}

const History = async () => {
  const { avg, analyses } = await getData()
  const updatedAnalyses = analyses.map((analysis) => ({
    ...analysis.toObject(),
  }))
  return (
    <div className="flex flex-col items-center justify-center lg:px-10 md:px-6 px-3 py-32">
      <div className="text-lg font-semibold">{`Average Sentiment: ${avg}`}</div>
      <div className="w-full h-[500px]">
        <HistoryChart data={updatedAnalyses} />
      </div>
    </div>
  )
}

export default History
