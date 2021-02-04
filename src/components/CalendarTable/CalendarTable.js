import './calendarTableFunctionality'
import './style.scss'

const tableHeader = ['Name', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const tableMeetingTime = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']

const createCalendarTableCol = (day) => {
  return `
    <div class="calendar-table__col">
       ${tableMeetingTime.map(item => {
          return `
            <div 
              id="${[item, day].join(' ')}"
              class="calendar-table__cell">${day === 'Name' ? item : ''}</div>
          `
        }).join(' ')}
    </div>
  `
}

const createCalendarTableTemplate = () => {
  return `
    <div class="calendar-table__row">
      ${tableHeader.map(item => {
          return `
            <div class="calendar-table__cell first-row">
              ${item}
            </div>
          `
      }).join(' ')
    }
    </div>
    <div class="calendar-table__row">
      ${tableHeader.map(item => {
        return createCalendarTableCol(item)
      }).join(' ')}
    </div>
  `
}



const CalendarTable = document.createElement('div')
CalendarTable.classList.add('calendar-table__wrapper')
CalendarTable.innerHTML = createCalendarTableTemplate()

export default CalendarTable