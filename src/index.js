import {
  CalendarPage,
  AddNewMeetingPage,
  MeetingInfoPage,
  MeetingEditPage
} from '@pages'
import './styles.scss'

const $rootBlock = document.getElementById('root')

$rootBlock.appendChild(CalendarPage)
$rootBlock.appendChild(AddNewMeetingPage)
$rootBlock.appendChild(MeetingInfoPage)
$rootBlock.appendChild(MeetingEditPage)

const meetingsArr = JSON.parse(localStorage.getItem('meetingsArr'))

if (!meetingsArr) {
  localStorage.setItem('meetingsArr', JSON.stringify([]))
}