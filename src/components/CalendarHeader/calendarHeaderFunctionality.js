import { AddNewMeetingPage, CalendarPage } from '@pages'
import { addClass, removeClass } from '@/helpers'
import { ConfirmLogoutModal } from '@components'
import { displayPlanedMeetings } from '@components/CalendarTable/CalendarTable'

export const addCalendarHeaderFunctionality = () => {
  const $meetingsFilterSelect = document.getElementById('meetingsFilterSelect')
  const $goToAddNewMeetingPageBtn = document.getElementById('goToAddNewMeetingPageBtn')
  const $logoutBtn = document.getElementById('logoutBtn')

  const goToAddNewMeetingPage = () => {
    const meetings = JSON.parse(localStorage.getItem('meetings'))

    addClass(CalendarPage, 'hide')
    removeClass(CalendarPage, 'show')
    addClass(AddNewMeetingPage, 'show')
    removeClass(AddNewMeetingPage, 'hide')
    $meetingsFilterSelect.value = 'All members'
    displayPlanedMeetings(meetings)
  }

  const filterMeetings = () => {
    const meetings = JSON.parse(localStorage.getItem('meetings'))

    if ($meetingsFilterSelect.value !== 'All members') {
      const filteredMeetingsArrByParticipants = meetings.filter((meeting) => {
        if (meeting.data.participants.includes($meetingsFilterSelect.value)) {
          return meeting
        }
      })

      displayPlanedMeetings(filteredMeetingsArrByParticipants)
    } else {
      displayPlanedMeetings(meetings)
    }
  }

  const logout = () => {
    addClass(ConfirmLogoutModal, 'show')
    removeClass(ConfirmLogoutModal, 'hide')
  }

  $logoutBtn.addEventListener('click', logout)
  $logoutBtn.addEventListener('unload', () => {
    $logoutBtn.removeEventListener('click', logout)
  })

  if ($goToAddNewMeetingPageBtn) {
    $goToAddNewMeetingPageBtn.addEventListener('click', goToAddNewMeetingPage)
    $goToAddNewMeetingPageBtn.addEventListener('unload', () => {
      $goToAddNewMeetingPageBtn.removeEventListener('click', goToAddNewMeetingPage)
    })
  }

  $meetingsFilterSelect.addEventListener('change', filterMeetings)
  $meetingsFilterSelect.addEventListener('unload', () => {
    $meetingsFilterSelect.removeEventListener('click', filterMeetings)
  })
}
