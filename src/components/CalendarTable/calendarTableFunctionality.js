import {CalendarPage} from '@pages'
import {displayPlanedMeetings} from './CalendarTable'
import {addClass, removeClass} from '@/helpers'

export const calendarTableFunctionality = () => {
  const $deleteMeeting = document.querySelectorAll('.delete-meeting')
  const $confirmModal = document.getElementById('confirmModal')
  const $cancelDeleteMeetingBtn = document.getElementById('cancelDeleteMeetingBtn')
  const $confirmDeleteMeetingBtn = document.getElementById('confirmDeleteMeetingBtn')
  const $calendarTableCell = document.querySelectorAll('.calendar-table__cell_meetings')
  const $meetingInfoPage = document.getElementById('meetingInfoPage')
  const $meetingInfoTitle = document.getElementById('meetingInfoTitle')
  const $meetingNameLabel = document.getElementById('meetingNameLabel')
  const $meetingNameValue = document.getElementById('meetingNameValue')
  const $dayLabel = document.getElementById('dayLabel')
  const $dayValue = document.getElementById('dayValue')
  const $timeLabel = document.getElementById('timeLabel')
  const $timeValue = document.getElementById('timeValue')
  const $participantsLabel = document.getElementById('participantsLabel')
  const $participantsValue = document.getElementById('participantsValue')
  const $editMeetingTitle = document.getElementById('editMeetingTitle')
  const $meetingEditName = document.getElementById('meetingEditName')
  const $daysSelect = document.getElementById('editDaysSelect')
  const $timeSelect = document.getElementById('editTimeSelect')
  const $checkboxes = document.querySelectorAll('.meeting-edit__checkbox')
  const $meetingsFilterSelect = document.getElementById('meetingsFilterSelect')
  const $modalMessageMeetingName = document.getElementById('modalMessageMeetingName')
  const meetingsArr = JSON.parse(localStorage.getItem('meetingsArr'))

  const cancelDeleteMeeting = () => {
    addClass($confirmModal, 'hide')
    removeClass($confirmModal, 'show')
  }

  const confirmDeleteMeeting = (changedMeetingsArr) => {
    localStorage.setItem('meetingsArr', JSON.stringify(changedMeetingsArr))
    displayPlanedMeetings(changedMeetingsArr)
    addClass($confirmModal, 'hide')
    removeClass($confirmModal, 'show')
  }

  const deleteMeeting = (button) => {
    addClass($confirmModal, 'show')
    removeClass($confirmModal, 'hide')
    const changedMeetingsArr = meetingsArr.filter(meeting => {
      if (meeting.id !== button.id) {
        return meeting
      } else {
        $modalMessageMeetingName.innerText = meeting.meetingName
      }
    })

    $cancelDeleteMeetingBtn.addEventListener('click', cancelDeleteMeeting)
    $cancelDeleteMeetingBtn.addEventListener('unload', () => {
      $cancelDeleteMeetingBtn.removeEventListener('click', confirmDeleteMeeting)
    })

    $confirmDeleteMeetingBtn.addEventListener('click', () => confirmDeleteMeeting(changedMeetingsArr))
    $confirmDeleteMeetingBtn.addEventListener('unload', () => {
      $confirmDeleteMeetingBtn.removeEventListener('click', () => confirmDeleteMeeting(changedMeetingsArr))
    })
  }

  $deleteMeeting.forEach(button => {
    button.addEventListener('click', () => deleteMeeting(button))
    button.addEventListener('unload', () => {
      button.removeEventListener('click', () => deleteMeeting(button))
    })
  })

  $calendarTableCell.forEach(cell => {
    if (meetingsArr && meetingsArr.length) {
      meetingsArr.map(meeting => {
        if (cell.id !== meeting.id) {
          return
        }
        cell.addEventListener('click', (event) => {
          const tagName = event.target.tagName.toLowerCase()
          if (tagName !== 'img' && tagName !== 'button') {
            localStorage.setItem('editMeetingId', cell.id)
            addClass($meetingInfoPage, 'show')
            removeClass($meetingInfoPage, 'hide')
            addClass(CalendarPage, 'hide')
            removeClass(CalendarPage, 'show')
            $meetingsFilterSelect.value = 'All members'
            displayPlanedMeetings(meetingsArr)
            $meetingInfoTitle.textContent = meeting.meetingName
            $meetingNameLabel.textContent = 'Meeting name:'
            $meetingNameValue.textContent = meeting.meetingName
            $dayLabel.textContent = 'Day:'
            $dayValue.textContent = meeting.selectedDay
            $timeLabel.textContent = 'Time:'
            $timeValue.textContent = meeting.selectedTime
            $participantsLabel.textContent = 'Participants:'
            $participantsValue.innerHTML = meeting.participants.map(participant => {
              return `<li class="meeting-info__item_value">${participant}</li>`
            }).join(' ')
            $editMeetingTitle.innerText = meeting.meetingName
            $meetingEditName.value = meeting.meetingName
            $daysSelect.value = meeting.selectedDay
            $timeSelect.value = meeting.selectedTime
            $checkboxes.forEach(checkbox => {
              const checkboxField = checkbox.childNodes[3]
              checkboxField.checked = meeting.participants.includes(checkboxField.id)
            })
          }

          const editMeetingsArr = meetingsArr.filter(meeting => meeting.id !== cell.id)
          localStorage.setItem('editedArr', JSON.stringify(editMeetingsArr))
        })
      })
    }
  })
}