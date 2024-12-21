const createURL = (path) => {
  return window.location.origin + path
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/journal'), {
      method: 'POST',
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.entry
  }
}

export const updateEntry = async (id, content) => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({ content }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}

export const askQuestion = async (question) => {
  const res = await fetch(
    new Request(createURL(`/api/question`), {
      method: 'POST',
      body: JSON.stringify({ question }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  }
}
