import React from 'react'

const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  const backgroundColor = entry.analysis.color
  return (
    <div className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200 h-full text-black py-5" style={{ backgroundColor }}>
      <div className="px-4 pb-8">{date}</div>
      <div className="px-4 py-4">{entry.analysis.subject}</div>
      <div className="px-4 py-4">{entry.analysis.mood}</div>
    </div>
  )
}

export default EntryCard
