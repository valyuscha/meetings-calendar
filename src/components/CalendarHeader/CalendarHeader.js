import {users} from '@server'
import {addClass} from '@/helpers'
import {Select} from '@components/UI'
import './calendarHeaderFunctionality'
import './style.scss'

const createCalendarHeaderContentTemplate = () => {
  return `
    <h1 class="calendar-header__title">Calendar</h1>
    <div class="calendar-header__right-part">
      ${Select({
        className: 'calendar-header__right-part_select',
        optionsArr: users,
        extraOption: 'All members', 
        id: 'meetingsFilterSelect',
        extraOptionId: 'allMembers'
      })} 
      <button
        id="goToAddNewMeetingPageBtn"
        class="calendar-header__right-part_add-event-button">
        New event +</button>
    </div>
  `
}

const CalendarHeader = document.createElement('div')
addClass(CalendarHeader, 'calendar-header__wrapper')
CalendarHeader.innerHTML = createCalendarHeaderContentTemplate()

export default CalendarHeader