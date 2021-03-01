import {User, Admin} from '@/models'
import {baseURL} from './baseURL'

const transformUsersData = (users) => {
  return users.map(user => {
    if (user.data.status === 'admin') {
      return new Admin(user.id, user.data.name, user.data.age)
    } else if (user.data.status === 'user') {
      return new User(user.id, user.data.name, user.data.age)
    }
  })
}

export const getAllUsers = async () => {
  try {
    const response = await fetch(`${baseURL}/users`)
    const usersList = await response.json()

    const parsedUsersList = usersList.map(user => ({
      data: JSON.parse(user.data),
      id: user.id
    }))

    return transformUsersData(parsedUsersList)
  } catch (e) {
    alert(`Error: ${e}`)
  }
}