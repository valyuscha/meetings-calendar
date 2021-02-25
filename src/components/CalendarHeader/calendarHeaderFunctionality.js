import {AddNewMeetingPage, CalendarPage} from '@pages'
import {addClass, removeClass} from '@/helpers'
import {ConfirmLogoutModal} from '@components'
import {displayPlanedMeetings} from '@components/CalendarTable/CalendarTable'

document.addEventListener('DOMContentLoaded', () => {
  const $meetingsFilterSelect = document.getElementById('meetingsFilterSelect')
  const $goToAddNewMeetingPageBtn = document.getElementById('goToAddNewMeetingPageBtn')
  const $logoutBtn = document.getElementById('logoutBtn')

  const goToAddNewMeetingPage = () => {
    const meetingsArr = JSON.parse(localStorage.getItem('meetingsArr'))

    addClass(CalendarPage, 'hide')
    removeClass(CalendarPage, 'show')
    addClass(AddNewMeetingPage, 'show')
    removeClass(AddNewMeetingPage, 'hide')
    $meetingsFilterSelect.value = 'All members'
    displayPlanedMeetings(meetingsArr)
  }

  const filterMeetings = () => {
    const meetingsArr = JSON.parse(localStorage.getItem('meetingsArr'))

    if ($meetingsFilterSelect.value !== 'All members') {
      const filteredMeetingsArrByParticipants = meetingsArr.filter(meeting => {
        if (meeting.participants.includes($meetingsFilterSelect.value)) {
          return meeting
        }
      })

      displayPlanedMeetings(filteredMeetingsArrByParticipants)
    } else {
      displayPlanedMeetings(meetingsArr)
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
})