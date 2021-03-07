import User from './User'

class Admin extends User {
  constructor(id, name, age) {
    super(id, name, age)
    this.canUserEditMeetingInfo = true
    this.canUserDeleteMeeting = true
    this.canUserCreateMeeting = true
  }
}

export default Admin
