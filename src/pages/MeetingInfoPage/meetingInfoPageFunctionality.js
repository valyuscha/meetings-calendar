import {CalendarPage} from '@pages'
import {addClass, removeClass} from '@/helpers'

export const addMeetingInfoPageFunctionality = () => {
  const $meetingInfoPage = document.getElementById('meetingInfoPage')
  const $goBackToCalendarPageBtn = document.getElementById('goBackToCalendarPageBtn')
  const $goToEditMeetingPageBtn = document.getElementById('goToEditMeetingPageBtn')
  const $meetingEditPage = document.getElementById('meetingEditPage')

  const goBackToCalendarPage = () => {
    addClass(CalendarPage, 'show')
    removeClass(CalendarPage, 'hide')
    addClass($meetingInfoPage, 'hide')
    removeClass($meetingInfoPage, 'show')
  }

  const goToEditMeetingPage = () => {
    addClass($meetingInfoPage, 'hide')
    removeClass($meetingInfoPage, 'show')
    addClass($meetingEditPage, 'show')
    removeClass($meetingEditPage, 'hide')
  }

  $goBackToCalendarPageBtn.addEventListener('click', goBackToCalendarPage)
  $goBackToCalendarPageBtn.addEventListener('unload', () => {
    $goBackToCalendarPageBtn.removeEventListener('click', goBackToCalendarPage)
  })

  $goToEditMeetingPageBtn.addEventListener('click', goToEditMeetingPage)
  $goToEditMeetingPageBtn.addEventListener('unload', () => {
    $goToEditMeetingPageBtn.removeEventListener('click', goToEditMeetingPage)
  })
}