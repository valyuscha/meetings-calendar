import {
  CalendarHeader,
  CalendarTable,
  ConfirmMeetingDeletingModal,
  ConfirmLogoutModal
} from '@components'
import {addClass} from '@/helpers'

const CalendarPage = document.createElement('div')
addClass(CalendarPage, 'show')
CalendarPage.appendChild(CalendarHeader)
CalendarPage.appendChild(CalendarTable)
CalendarPage.appendChild(ConfirmMeetingDeletingModal)
CalendarPage.appendChild(ConfirmLogoutModal)

export default CalendarPage