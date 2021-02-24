import {CalendarHeader, CalendarTable, ConfirmMeetingDeletingModal} from '@components'
import {addClass} from '@/helpers'

const CalendarPage = document.createElement('div')
addClass(CalendarPage, 'show')
CalendarPage.appendChild(CalendarHeader)
CalendarPage.appendChild(CalendarTable)
CalendarPage.appendChild(ConfirmMeetingDeletingModal)

export default CalendarPage