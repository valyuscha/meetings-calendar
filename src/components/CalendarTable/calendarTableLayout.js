import { time } from '@server'
import { addClass } from '@/helpers'
import { deleteMeeting } from '@assets'
import './style.scss'

const tableHeader = ['Name', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

const createCalendarTableCol = (day) => {
  const cellClassNames = ['calendar-table__cell']
  day !== 'Name' ? cellClassNames.push('calendar-table__cell_meetings') : null

  return `
    <div class="calendar-table__col">
      ${time.map((item) => `
          <div 
            id="${[item, day].join(' ')}"
            class="${cellClassNames.join(' ')}">
            ${day === 'Name' ? item : ''}
          </div>
        `).join(' ')}
    </div>
  `
}

export const createCalendarTableTemplate = () => `
    <div class="calendar-table__row">
      ${tableHeader.map((item) => `
          <div class="calendar-table__cell first-row">
            ${item}
          </div>
        `).join(' ')}
    </div>
    <div class="calendar-table__row">
      ${tableHeader.map((item) => createCalendarTableCol(item)).join(' ')}
    </div>
  `

const CalendarTable = document.createElement('div')
addClass(CalendarTable, 'calendar-table__wrapper')
CalendarTable.innerHTML = createCalendarTableTemplate()

export default CalendarTable
