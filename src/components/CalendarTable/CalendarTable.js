import {time} from '@server'
import {addClass} from '@/helpers'
import {deleteMeeting} from '@assets'
import {calendarTableFunctionality} from './calendarTableFunctionality'
import {authorizeModalFunctionality} from '../AuthorizeModal/authoriseModalFunctionality'
import './style.scss'

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
    if (planedMeetingsArr !== null) {
      planedMeetingsArr.map(meeting => {
        if (cell.id === meeting.data.id) {
          planedMeetingsCells.push(cell)
          cell.innerHTML = `
          <div class="calendar-table__cell_content" style="cursor: pointer">
            <p>${meeting.data.meetingName}</p>
            <button id="${meeting.data.id}" class="${deleteMeetingBtnClasses.join(' ')}">
              <img src="${deleteMeeting}">
            </button>
          </div>
        `
        }
      })
    }
  })

  calendarTableFunctionality()
  authorizeModalFunctionality()
}