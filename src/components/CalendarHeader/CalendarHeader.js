import {users} from '@server'
import './calendarHeaderFunctionality'
import './style.scss'

const createCalendarHeaderContentTemplate = () => {
  return `
    <h1 class="calendar-header__title">Calendar</h1>
    <div class="calendar-header__right-part">
      <select id="meetingsFilterSelect" class="calendar-header__right-part_select">
        <option class="calendar-header__right-part_select_option">All members</option>
        ${users.map(user => {
          return `
            <option 
              id=${user.id} 
              class="calendar-header__right-part_select_option">
              ${user.name}</option>`
        })}
      </select>
      <button
        id="addNewMeetingButton"
        class="calendar-header__right-part_add-event-button">
        New event +</button>
    </div>
  `
}

const CalendarHeader = document.createElement('div')
CalendarHeader.classList.add('calendar-header__wrapper')
CalendarHeader.innerHTML = createCalendarHeaderContentTemplate()

export default CalendarHeader