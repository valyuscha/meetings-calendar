import {CalendarHeader, CalendarTable} from '@components'
import {addClass} from '@/helpers'
import {Modal} from '@components/UI'

const ModalWrapper = document.createElement('div')
addClass(ModalWrapper, 'hide')
addClass(ModalWrapper, 'modal__wrapper')
ModalWrapper.id = 'confirmModal'
ModalWrapper.innerHTML = Modal()

const CalendarPage = document.createElement('div')
addClass(CalendarPage, 'show')
CalendarPage.appendChild(CalendarHeader)
CalendarPage.appendChild(CalendarTable)
CalendarPage.appendChild(ModalWrapper)

export default CalendarPage