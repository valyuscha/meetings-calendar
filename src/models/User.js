class User {
  constructor(id, name, age) {
    this.id = id
    this.name = name
    this.age = age
    this.canUserEditMeetingInfo = false
    this.canUserDeleteMeeting = false
    this.canUserCreateMeeting = false
  }
}

export default User
