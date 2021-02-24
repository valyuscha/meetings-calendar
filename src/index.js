import AuthorizeModal from '@components/AuthorizeModal/AuthorizeModal'
import {addClass} from '@/helpers'
import {users} from '@server'

import {
  CalendarPage,
  AddNewMeetingPage,
  MeetingInfoPage,
  MeetingEditPage
} from '@pages'
import './styles.scss'

const $rootBlock = document.getElementById('root')

const $virtualDom = document.createElement('div')
$virtualDom.appendChild(CalendarPage)
$virtualDom.appendChild(AddNewMeetingPage)
$virtualDom.appendChild(MeetingInfoPage)
$virtualDom.appendChild(MeetingEditPage)
$virtualDom.appendChild(AuthorizeModal)

const meetingsArr = JSON.parse(localStorage.getItem('meetingsArr'))

if (!meetingsArr) {
  localStorage.setItem('meetingsArr', JSON.stringify([]))
}

localStorage.setItem('usersList', JSON.stringify(users))
const activeUser = JSON.parse(localStorage.getItem('activeUser'))

if (activeUser) {
  addClass(AuthorizeModal, 'hide')
}

$rootBlock.appendChild($virtualDom)