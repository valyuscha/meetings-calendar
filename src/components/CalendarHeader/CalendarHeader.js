import {users} from '@server'
import {addClass} from '@/helpers'
import {Select} from '@components/UI'
import './calendarHeaderFunctionality'
import './style.scss'

export const createCalendarHeaderContentTemplate = () => {
  const activeUser = JSON.parse(localStorage.getItem('activeUser'))
  const newMeetingBtnClasses = ['calendar-header__right-part_button']

  if (activeUser && activeUser.canUserCreateMeeting) {
    newMeetingBtnClasses.push('show')
  } else {
    newMeetingBtnClasses.push('hide')
  }

  return `
    <h1 class="calendar-header__title">Calendar</h1>
    <div class="calendar-header__right-part">
      <button id="logoutBtn" class="calendar-header__right-part_button">Logout</button>
      ${Select({
        className: 'calendar-header__right-part_select',
        optionsArr: users,
        extraOption: 'All members', 
        id: 'meetingsFilterSelect',
        extraOptionId: 'allMembers'
      })} 
      <button
        id="goToAddNewMeetingPageBtn"
        class="${newMeetingBtnClasses.join(' ')}">
        New event +</button>
    </div>
  `
}

const CalendarHeader = document.createElement('div')
addClass(CalendarHeader, 'calendar-header__wrapper')
CalendarHeader.innerHTML = createCalendarHeaderContentTemplate()

export default CalendarHeader