import {CalendarPage, MeetingEditPage} from '@pages'
import {addClass, removeClass} from '@/helpers'

document.addEventListener('DOMContentLoaded', () => {
  const $meetingInfoPage = document.getElementById('meetingInfoPage')
  const $goBackToCalendarPageBtn = document.getElementById('goBackToCalendarPageBtn')
  const $goToEditMeetingPageBtn = document.getElementById('goToEditMeetingPageBtn')

  const goBackToCalendarPage = () => {
    addClass(CalendarPage, 'show')
    removeClass(CalendarPage, 'hide')
    addClass($meetingInfoPage, 'hide')
    removeClass($meetingInfoPage, 'show')
  }

  const goToEditMeetingPage = () => {
    addClass($meetingInfoPage, 'hide')
    removeClass($meetingInfoPage, 'show')
    addClass(MeetingEditPage, 'show')
    removeClass(MeetingEditPage, 'hide')
  }

  $goBackToCalendarPageBtn.addEventListener('click', goBackToCalendarPage)
  $goBackToCalendarPageBtn.addEventListener('unload', () => {
    $goBackToCalendarPageBtn.removeEventListener('click', goBackToCalendarPage)
  })

  $goToEditMeetingPageBtn.addEventListener('click', goToEditMeetingPage)
  $goToEditMeetingPageBtn.addEventListener('unload', () => {
    $goToEditMeetingPageBtn.removeEventListener('click', goToEditMeetingPage)
  })
})