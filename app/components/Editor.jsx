'use client'
import React, { useState } from 'react'
import { deleteEntry, updateEntry } from '../libs/api'
import SideAnalysis from './SideAnalysis'
import { redirect } from 'next/navigation'

const Editor = ({ entry }) => {
  if (!entry) {
    return <div>No entry available.</div>
  }

  const [value, setValue] = useState(entry.content)
  const [savestatus, setSaveStatus] = useState('')
  const [analysis, setAnalysis] = useState(entry.analysis)
  const [DeleteStatus, setDeleteStatus] = useState('')

  const handleSave = async () => {
    setSaveStatus('Saving...')
    const updatedEntry = await updateEntry(entry._id, value)
    if (updatedEntry) {
      setSaveStatus('')
      setAnalysis(updatedEntry.analysis)
    }
  }

  const handleDelete = async () => {
    setDeleteStatus('Deleting...')
    console.log('Delete entry')
    const updatedEntry = await deleteEntry(entry._id)
    if (updatedEntry) {
      setDeleteStatus('')
      redirect('/journal')
    }
  }

  return (
    <div className="w-full h-full flex justify-center lg:px-12 px-2 md:py-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 w-full">
        <div className="col-span-2">
          <textarea
            className="h-full w-full md:min-h-[650px] min-h-[250px] border border-gray-300 rounded-sm bg-gray-50 pb-8 px-4 pt-4 focus:outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder=""
          />
          <button
            className="text-gray-800 bg-[#ffcc00] border-[#ffcc00] px-8 py-3 transform transition duration-200 font-semibold text-xl rounded-lg border-2 hover:scale-105 mr-4"
            onClick={handleSave}
            disabled={savestatus}
          >
            {savestatus || 'Save'}
          </button>
          <button
            className="text-white bg-red-600 border-red-600 px-8 py-3 transform transition duration-200 font-semibold text-xl rounded-lg border-2 hover:scale-105"
            onClick={handleDelete}
            disabled={DeleteStatus}
          >
            {DeleteStatus || 'Delete'}
          </button>
        </div>
        <div className="border border-gray-300 rounded-sm bg-gray-100 mt-16 md:mt-0">
          <SideAnalysis analysis={analysis} />
        </div>
      </div>
    </div>
  )
}

export default Editor
