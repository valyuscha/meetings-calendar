import {baseURL} from '../server'
import ResponseDebugger from './ResponseDebugger'
import {Admin, User} from './index'

class RequestsSender extends ResponseDebugger {
  getAllMeetings = async () => {
    const response = await fetch(`${baseURL}/events`)
    const meetings = await response.json()
    this.getResponse(response)

    return meetings ? meetings.map(meeting => ({
      data: JSON.parse(meeting.data),
      id: meeting.id
    })) : []
  }

  addNewMeeting = async (postData) => {
    const postDataObg = {
      data: JSON.stringify(postData),
      id: postData.id
    }

    const response = await fetch(`${baseURL}/events`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(postDataObg)
    })

    this.getResponse(response)

    return await response.json()
  }

  editMeetingInfo = async (postData, editMeetingId) => {
    const postDataObg = {
      data: JSON.stringify(postData),
      id: postData.id
    }

    const response = await fetch(`${baseURL}/events/${editMeetingId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(postDataObg)
    })

    this.getResponse(response)

    return await response.json()
  }

  deleteMeeting = async (meeting) => {
    const deleteData = {
      data: JSON.stringify(meeting[0].data),
      id: meeting[0].id
    }

    const response = await fetch(`${baseURL}/events/${meeting[0].id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(deleteData)
    })

    this.getResponse(response)

    return deleteData
  }

  getAllUsers = async () => {
    const response = await fetch(`${baseURL}/users`)
    const usersList = await response.json()

    const parsedUsersList = usersList.map(user => ({
      data: JSON.parse(user.data),
      id: user.id
    }))

    this.getResponse(response)

    return parsedUsersList.map(user => {
      if (user.data.status === 'admin') {
        return new Admin(user.id, user.data.name, user.data.age)
      } else if (user.data.status === 'user') {
        return new User(user.id, user.data.name, user.data.age)
      }
    })
  }
}

export default RequestsSender