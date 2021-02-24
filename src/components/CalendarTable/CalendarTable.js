import {time} from '@server'
import {addClass} from '@/helpers'
import {deleteMeeting} from '@assets'
import {calendarTableFunctionality} from './calendarTableFunctionality'
import {authorizeModalFunctionality} from '../AuthorizeModal/authoriseModalFunctionality'
import './style.scss'

const tableHeader = ['Name', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const meetingsArr = JSON.parse(localStorage.getItem('meetingsArr'))

export const displayPlanedMeetings = (planedMeetingsArr) => {
  const $calendarTableCell = document.querySelectorAll('.calendar-table__cell_meetings')
  const activeUser = JSON.parse(localStorage.getItem('activeUser'))

  const deleteMeetingBtnClasses = ['delete-meeting']

  if (activeUser && activeUser.canUserDeleteMeeting) {
    deleteMeetingBtnClasses.push('show')
  } else {
    deleteMeetingBtnClasses.push('hide')
  }

  $calendarTableCell.forEach(cell => {
    cell.innerHTML = ''
  })

  const planedMeetingsCells = []

  $calendarTableCell.forEach(cell => {
    planedMeetingsArr.map(meeting => {
      if (cell.id === meeting.id) {
        planedMeetingsCells.push(cell)
        cell.innerHTML = `
          <div class="calendar-table__cell_content" style="cursor: pointer">
            <p>${meeting.meetingName}</p> 
            <button id="${meeting.id}" class="${deleteMeetingBtnClasses.join(' ')}">
              <img src="${deleteMeeting}">
            </button>
          </div>
        `
      }
    })
  })

  calendarTableFunctionality()
  authorizeModalFunctionality()
}

document.addEventListener('DOMContentLoaded', () => {
  displayPlanedMeetings(meetingsArr)
})

const createCalendarTableCol = (day) => {
  const cellClassNames = ['calendar-table__cell']
  day !== 'Name' ? cellClassNames.push('calendar-table__cell_meetings') : null

  return `
    <div class="calendar-table__col">
      ${time.map(item => {
        return `
          <div 
            id="${[item, day].join(' ')}"
            class="${cellClassNames.join(' ')}">
            ${day === 'Name' ? item : ''}
          </div>
        `
      }).join(' ')}
    </div>
  `
}

const createCalendarTableTemplate = () => {
  return `
    <div class="calendar-table__row">
      ${tableHeader.map(item => {
        return `
          <div class="calendar-table__cell first-row">
            ${item}
          </div>
        `
      }).join(' ')}
    </div>
    <div class="calendar-table__row">
      ${tableHeader.map(item => {
        return createCalendarTableCol(item)
      }).join(' ')}
    </div>
  `
}


const CalendarTable = document.createElement('div')
addClass(CalendarTable, 'calendar-table__wrapper')
CalendarTable.innerHTML = createCalendarTableTemplate()

export default CalendarTable