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
          className="border border-black font-semibold rounded-lg py-3 md:pr-56 pr-10 pl-2 mr-3"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-[#ffcc00] rounded-lg text-gray-700 font-semibold text-base md:text-lg lg:text-xl shadow-2xl shadow-red hover:scale-105 transform transition duration-300"
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
