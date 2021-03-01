import {baseURL} from '@server'

export const getAllMeetings = async () => {
  try {
    const response = await fetch(`${baseURL}/events`)
    const meetings = await response.json()
    return meetings ? meetings.map(meeting => ({
      data: JSON.parse(meeting.data),
      id: meeting.id
    })) : []
  } catch (e) {
    alert(`Error: ${e}`)
  }
}

export const addNewMeeting = async (postData) => {
  try {
    const postDataObg = {
      data: JSON.stringify(postData),
      id: postData.id
    }

    const response = await fetch(`${baseURL}/events`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(postDataObg)
    })

    return await response.json()
  } catch (e) {
    alert(`Error: ${e}`)
  }
}

export const editMeetingInfo = async (postData, editMeetingId) => {
  try {
    const postDataObg = {
      data: JSON.stringify(postData),
      id: postData.id
    }

    await fetch(`${baseURL}/events/${editMeetingId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(postDataObg)
    })
  } catch (e) {
    alert(`Error: ${e}`)
  }
}

export const deleteMeeting = async (meeting) => {
  try {
    const deleteData = {
      data: JSON.stringify(meeting[0].data),
      id: meeting[0].id
    }

    await fetch(`${baseURL}/events/${meeting[0].id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(deleteData)
    })
  } catch (e) {
    alert(`Error: ${e}`)
  }
}