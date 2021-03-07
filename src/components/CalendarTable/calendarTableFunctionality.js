import { CalendarPage } from '@pages'
import { baseURL } from '@server'
import { addClass, removeClass } from '@/helpers'
import { serverEventsMethods } from '@/serverCommunication'
import { displayPlanedMeetings } from './CalendarTable'

export const calendarTableFunctionality = () => {
  const $deleteMeeting = document.querySelectorAll('.delete-meeting')
  const $confirmModal = document.getElementById('confirmModal')
  const $cancelDeleteMeetingBtn = document.getElementById('cancelDeleteMeetingBtn')
  const $confirmDeleteMeetingBtn = document.getElementById('confirmDeleteMeetingBtn')
  const $calendarTableCell = document.querySelectorAll('.calendar-table__cell_meetings')
  const $modalMessageMeetingName = document.getElementById('modalMessageMeetingName')
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
  const meetings = JSON.parse(localStorage.getItem('meetings'))

  const cancelDeleteMeeting = () => {
    addClass($confirmModal, 'hide')
    removeClass($confirmModal, 'show')
  }

  const confirmDeleteMeeting = (meeting) => {
    serverEventsMethods.deleteMeeting(meeting)
      .then(serverEventsMethods.getAllMeetings)
      .then((meetings) => {
        localStorage.setItem('meetings', JSON.stringify(meetings))
        displayPlanedMeetings(meetings)
        addClass($confirmModal, 'hide')
        removeClass($confirmModal, 'show')
      })
  }

  const deleteMeeting = (button) => {
    addClass($confirmModal, 'show')
    removeClass($confirmModal, 'hide')
    const deleteMeeting = meetings.filter((meeting) => meeting.data.id === button.id)
    $modalMessageMeetingName.innerText = `${deleteMeeting[0].data.meetingName}`

    $cancelDeleteMeetingBtn.addEventListener('click', cancelDeleteMeeting)
    $cancelDeleteMeetingBtn.addEventListener('unload', () => {
      $cancelDeleteMeetingBtn.removeEventListener('click', cancelDeleteMeeting)
    })

    $confirmDeleteMeetingBtn.addEventListener('click', () => confirmDeleteMeeting(deleteMeeting))
    $confirmDeleteMeetingBtn.addEventListener('unload', () => {
      $confirmDeleteMeetingBtn.removeEventListener('click', () => confirmDeleteMeeting(deleteMeeting))
    })
  }

  $deleteMeeting.forEach((button) => {
    button.addEventListener('click', () => deleteMeeting(button))
    button.addEventListener('unload', () => {
      button.removeEventListener('click', () => deleteMeeting(button))
    })
  })

  const showEditMeetingInfo = (event, meeting) => {
    const tagName = event.target.tagName.toLowerCase()
    if (tagName !== 'img' && tagName !== 'button') {
      localStorage.setItem('editMeeting', JSON.stringify(meeting))
      addClass($meetingInfoPage, 'show')
      removeClass($meetingInfoPage, 'hide')
      addClass(CalendarPage, 'hide')
      removeClass(CalendarPage, 'show')
      $meetingsFilterSelect.value = 'All members'
      displayPlanedMeetings(meetings)
      $meetingInfoTitle.textContent = meeting.data.meetingName
      $meetingNameLabel.textContent = 'Meeting name:'
      $meetingNameValue.textContent = meeting.data.meetingName
      $dayLabel.textContent = 'Day:'
      $dayValue.textContent = meeting.data.selectedDay
      $timeLabel.textContent = 'Time:'
      $timeValue.textContent = meeting.data.selectedTime
      $participantsLabel.textContent = 'Participants:'
      $participantsValue.innerHTML = meeting.data.participants.map((participant) => `<li class="meeting-info__item_value">${participant}</li>`).join(' ')
      $editMeetingTitle.innerText = meeting.data.meetingName
      $meetingEditName.value = meeting.data.meetingName
      $daysSelect.value = meeting.data.selectedDay
      $timeSelect.value = meeting.data.selectedTime
      $checkboxes.forEach((checkbox) => {
        const checkboxField = checkbox.childNodes[3]
        checkboxField.checked = meeting.data.participants.includes(checkboxField.id)
      })
    }
  }

  $calendarTableCell.forEach((cell) => {
    if (meetings && meetings.length) {
      meetings.map((meeting) => {
        if (cell.id === meeting.data.id) {
          cell.addEventListener('click', (event) => {
            showEditMeetingInfo(event, meeting, cell)
          })
        }
      })
    }
  })
}
