'use client'
import React, { useState } from 'react'

const SideAnalysis = ({ analysis }) => {
  const { mood, summary, subject, negative, color } = analysis
  const analysisData = [
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative === true ? 'Yes' : 'No' },
    { name: 'Summary', value: summary },
  ]

  return (
    <div>
      <div
        className={
          ' flex justify-center items-center h-40 text-xl font-semibold'
        }
        style={{ backgroundColor: color }}
      >
        Analysis
      </div>
      <ul>
        {analysisData.map((data, index) =>
          data.name === 'Summary' ? (
            <li
              key={index}
              className="border-gray-300 px-2 py-6 flex flex-col grow gap-1"
            >
              <span className="font-semibold">{data.name}</span>
              <span>{data.value}</span>
            </li>
          ) : (
            <li
              key={index}
              className="border-b border-gray-300 px-2 py-6 flex justify-between"
            >
              <span className="font-semibold">{data.name}</span>
              <span>{data.value}</span>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default SideAnalysis
