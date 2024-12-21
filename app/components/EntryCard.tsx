import React from 'react'

const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString()
  return (
    <div className="bg-slate-100 rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200 h-full">
      <div className="px-4 py-5">{date}</div>
      <div className="px-4 py-5">summary</div>
      <div className="px-4 py-4">mood</div>
    </div>
  )
}

export default EntryCard
