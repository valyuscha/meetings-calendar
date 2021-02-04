import {CalendarPage} from '@pages'
import './styles.scss'

const $rootBlock = document.getElementById('root')

const AddNewMeetingPage = document.createElement('div')
AddNewMeetingPage.innerHTML = '<h1>Hello world</h1>'

const render = () => {
  const activePage = localStorage.getItem('activePage')
  $rootBlock.appendChild(CalendarPage)

  if (activePage === 'Add new meeting page') {
    $rootBlock.removeChild(CalendarPage)
    $rootBlock.appendChild(AddNewMeetingPage)
  }
}

render()

export default render