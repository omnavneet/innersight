'use client'
import React, { useState } from 'react'
import { askQuestion } from '../libs/api'

const Question = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const answer = await askQuestion(value)
    setResponse(answer)
    setValue('')
    setLoading(false)
  }

  return (
    <div className="mb-5">
      <form onSubmit={handleSubmit}>
        <input
          disabled={loading}
          type="text"
          placeholder="Enter your question here"
          value={value}
          onChange={onChange}
          className="border border-black font-semibold rounded-lg py-3 pr-56 pl-2 mr-3"
        />
        <button
          type="submit"
          className="bg-[#ffcc00] px-6 py-3 rounded-lg"
          disabled={loading}
        >
          Submit
        </button>
      </form>
      {loading && (
        <div className="w-10 h-10 border-4 border-t-4 border-gray-300 border-t-blue-500 rounded-full animate-spin my-2"></div>
      )}
      {response && (
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md max-w-xl my-2">
          {response}
        </div>
      )}
    </div>
  )
}

export default Question
