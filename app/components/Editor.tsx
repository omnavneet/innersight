'use client'
import React, { useState } from 'react'
import { updateEntry } from '../libs/api'
import SideAnalysis from './SideAnalysis'

const Editor = ({ entry }) => {
  if (!entry) {
    return <div>No entry available.</div>
  }

  const [value, setValue] = useState(entry.content)
  const [savestatus, setSaveStatus] = useState('')
  const [analysis, setAnalysis] = useState(entry.analysis)

  const handleSave = async () => {
    setSaveStatus('Saving...')
    const updatedEntry = await updateEntry(entry._id, value)
    if (updatedEntry) {
      setSaveStatus('')
      setAnalysis(updatedEntry.analysis)
    }
  }

  return (
    <div className="w-full h-full flex justify-center px-20 py-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <div className="col-span-2">
          <textarea
            className="h-full w-full min-h-[600px] border border-gray-300 rounded-sm bg-gray-50 pb-8 px-4 pt-4 focus:outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder=""
          />
          <button
            className="flex justify-center items-center px-10 py-3 hover:bg-green-600 hover:text-white hover:border-white border-green-600 border text-green-600 rounded-md mt-2 font-semibold transition-all"
            onClick={handleSave}
          >
            {savestatus || 'Save'}
          </button>
        </div>
        <div className="border border-gray-300 rounded-sm bg-gray-100">
          <SideAnalysis analysis={analysis} />
        </div>
      </div>
    </div>
  )
}

export default Editor
