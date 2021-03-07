import AuthorizeModal, { createAuthModalTemplate } from '@components/AuthorizeModal/AuthorizeModal'
import { Modal, Select } from '@components/UI'

import { addNewMeetingPageTemplate } from '@pages/AddNewMeetingPage/AddNewMeetingPage'
import { meetingEditPageTemplate } from '@pages/MeetingEditPage/MeetingEditPage'
import { addClass } from '@/helpers'
import { serverEventsMethods } from '@/serverCommunication'
import { addCalendarHeaderFunctionality } from '@components/CalendarHeader/calendarHeaderFunctionality'
import { displayPlanedMeetings } from '@components/CalendarTable/CalendarTable'
import { addConfirmLogoutModalFunctionality } from '@components/ConfirmLogoutModal/confirmLgoutModalFunctionality'
import { addNewMeetingPageFunctionality } from '@pages/AddNewMeetingPage/addNewMeetingPageFunctionality'
import { addMeetingInfoPageFunctionality } from '@pages/MeetingInfoPage/meetingInfoPageFunctionality'
import { addMeetingEditPageFunctionality } from '@pages/MeetingEditPage/meetingEditPageFunctionality'

import {
  CalendarPage,
  AddNewMeetingPage,
  MeetingInfoPage,
} from '@pages'
import './styles.scss'

const MeetingEditPage = document.createElement('div')

const render = async () => {
  const $rootBlock = document.getElementById('root')

  const users = await serverEventsMethods.getAllUsers()
  await localStorage.setItem('usersList', JSON.stringify(users))
  const meetings = await serverEventsMethods.getAllMeetings()
  await localStorage.setItem('meetings', JSON.stringify(meetings))

  MeetingEditPage.id = 'meetingEditPage'
  MeetingEditPage.innerHTML = meetingEditPageTemplate()
  addClass(MeetingEditPage, 'meeting-edit__wrapper')
  addClass(MeetingEditPage, 'hide')

  $rootBlock.appendChild(CalendarPage)
  $rootBlock.appendChild(AddNewMeetingPage)
  $rootBlock.appendChild(MeetingInfoPage)
  $rootBlock.appendChild(MeetingEditPage)
  $rootBlock.appendChild(AuthorizeModal)
}

const activeUser = JSON.parse(localStorage.getItem('activeUser'))

if (activeUser) {
  addClass(AuthorizeModal, 'hide')
}

render()
  .then(() => {
    AuthorizeModal.innerHTML = Modal(createAuthModalTemplate())
    AddNewMeetingPage.innerHTML = addNewMeetingPageTemplate()
    MeetingEditPage.innerHTML = meetingEditPageTemplate()
  })
  .then(serverEventsMethods.getAllUsers)
  .then((users) => {
    const $headerUsersSelect = document.getElementById('headerUsersSelect')
    $headerUsersSelect.innerHTML = `
      ${Select({
    className: 'calendar-header__right-part_select',
    optionsArr: users,
    extraOption: 'All members',
    id: 'meetingsFilterSelect',
    extraOptionId: 'allMembers',
  })} 
    `
  })
  .then(serverEventsMethods.getAllMeetings)
  .then(displayPlanedMeetings)
  .then(addCalendarHeaderFunctionality)
  .then(addConfirmLogoutModalFunctionality)
  .then(addNewMeetingPageFunctionality)
  .then(addMeetingInfoPageFunctionality)
  .then(addMeetingEditPageFunctionality)
