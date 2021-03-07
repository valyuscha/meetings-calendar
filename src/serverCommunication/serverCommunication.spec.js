import { serverEventsMethods } from './serverCommunication'
import { Admin, User } from '../models'

describe('server communication functions', () => {
  it('should return array with the list of meetings', async () => {
    const meetingsData = [{
      id: '1311bf0f-aad6-48cf-9e70-3b3baca00940',
      data: '{"meetingName":"Today","selectedDay":"Wednesday","selectedTime":"15:00","participants":["Vladimir","Sam"],"id":"15:00 Wed"}',
    }]

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(meetingsData),
    }))

    const allMeetings = await serverEventsMethods.getAllMeetings()
    expect(allMeetings).toEqual(meetingsData.map((meeting) => ({
      data: JSON.parse(meeting.data),
      id: meeting.id,
    })))
  })

  it('should post new event by creating object with data and id keys', async () => {
    const newMeetingData = {
      data: '{"meetingName":"Friday","selectedDay":"Friday",'
      + '"selectedTime":"18:00","participants":["Vladimir","Kath"],"id":"18:00 Fri"}',
      id: 'd2c45af6-12a6-4e86-9061-ed6b6470be27',
    }

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(newMeetingData),
    }))

    const newMeeting = await serverEventsMethods.addNewMeeting({
      meetingName: 'Friday',
      selectedDay: 'Friday',
      selectedTime: '18:00',
      participants: ['Vladimir', 'Kath'],
      id: '18:00 Fri',
    })

    expect(newMeeting).toEqual(newMeetingData)
  })

  it('should edit created event by creating object with data and id keys', async () => {
    const editMeetingData = {
      id: 'd2c45af6-12a6-4e86-9061-ed6b6470be27',
      data: '{"meetingName":"Friday","selectedDay":"Friday",'
      + '"selectedTime":"18:00","participants":["Vladimir","Kath"],"id":"18:00 Fri"}',
    }

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(editMeetingData),
    }))

    const editMeeting = await serverEventsMethods.editMeetingInfo({
      meetingName: 'Friday',
      selectedDay: 'Friday',
      selectedTime: '18:00',
      participants: ['Vladimir', 'Kath'],
      id: '18:00 Fri',
    }, 'd2c45af6-12a6-4e86-9061-ed6b6470be27')

    expect(editMeeting).toEqual(editMeetingData)
  })

  it('should delete event by creating object with data and id keys', async () => {
    const deleteMeetingData = {
      data: '{"meetingName":"Friday","selectedDay":"Friday",'
      + '"selectedTime":"18:00","participants":["Vladimir","Kath"],"id":"18:00 Fri"}',
      id: 'd2c45af6-12a6-4e86-9061-ed6b6470be27',
    }

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(deleteMeetingData),
    }))

    const deleteMeeting = await serverEventsMethods.deleteMeeting([{
      id: 'd2c45af6-12a6-4e86-9061-ed6b6470be27',
      data: {
        meetingName: 'Friday',
        selectedDay: 'Friday',
        selectedTime: '18:00',
        participants: ['Vladimir', 'Kath'],
        id: '18:00 Fri',
      },
    }])

    expect(deleteMeeting).toEqual(deleteMeetingData)
  })

  it('should show array with the list of all users', async () => {
    const usersListData = [
      {
        data: '{"name":"Ann","age":28, "status":"admin"}',
        id: '0b76532a-905c-459d-9b89-ba4412ecb827',
      },
      {
        data: '{"name":"Suzi","age":34,"status":"user"}',
        id: '0b76532a-905c-459d-9b89-ba4412ecb827',
      },
    ]

    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(usersListData),
    }))

    const parsedUsersListData = usersListData.map((user) => ({
      data: JSON.parse(user.data),
      id: user.id,
    }))

    const usersList = await serverEventsMethods.getAllUsers()

    expect(usersList).toEqual(parsedUsersListData.map((user) => {
      if (user.data.status === 'admin') {
        return new Admin(user.id, user.data.name, user.data.age)
      } if (user.data.status === 'user') {
        return new User(user.id, user.data.name, user.data.age)
      }
    }))
  })
})
