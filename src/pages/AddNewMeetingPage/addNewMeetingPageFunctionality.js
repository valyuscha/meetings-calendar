import { addClass, removeClass } from '@/helpers'
import { createFormData } from '@/utils'
import { displayPlanedMeetings } from '@components/CalendarTable/CalendarTable'
import CalendarTable, { createCalendarTableTemplate } from '@components/CalendarTable/calendarTableLayout'

import { AddNewMeetingPage, CalendarPage } from '@pages'
import { serverEventsMethods } from '@/serverCommunication'

export const addNewMeetingPageFunctionality = () => {
  const $cancelBtn = document.getElementById('cancelBtn')
  const $addNewMeetingBtn = document.getElementById('addNewMeetingBtn')
  const $checkboxes = document.getElementById('addNewMeetingCheckboxes')
  const $newEventNameInput = document.getElementById('newEventName')
  const $daysSelect = document.getElementById('daysSelect')
  const $timeSelect = document.getElementById('timeSelect')
  const $nameFieldErrorMessage = document.getElementById('addNewMeetingNameErrorMessage')
  const $checkboxesErrorMessage = document.getElementById('addNewMeetingCheckboxesErrorMessage')
  const $addNewMeetingErrorMessage = document.getElementById('addNewMeetingErrorMessage')
  const $hideAddMeetingErrorMessage = document.getElementById('hideAddMeetingErrorMessage')
  const $title = document.getElementById('addMeetingTitle')
  const $calendarTableCell = document.querySelectorAll('.calendar-table__cell_meetings')
  let isFormValid = false

  const countMarginForTitle = () => {
    if ($addNewMeetingErrorMessage.classList.contains('show-add-meeting-error-message')) {
      $title.style.marginTop = '40px'
      $title.style.transition = 'margin-top .5s'
    } else {
      $title.style.marginTop = '0'
      $title.style.transition = 'margin-top .5s'
    }
  }

  const showAddMeetingErrorMessage = () => {
    addClass($addNewMeetingErrorMessage, 'show-add-meeting-error-message')
    removeClass($addNewMeetingErrorMessage, 'hide-add-meeting-error-message')
    countMarginForTitle()
    return $addNewMeetingErrorMessage
  }

  const hideAddMeetingErrorMessage = () => {
    addClass($addNewMeetingErrorMessage, 'hide-add-meeting-error-message')
    removeClass($addNewMeetingErrorMessage, 'show-add-meeting-error-message')
    countMarginForTitle()
    return $addNewMeetingErrorMessage
  }

  const clearFormData = () => {
    $newEventNameInput.value = ''
    $daysSelect.value = 'Monday'
    $timeSelect.value = '10:00'

    $checkboxes.childNodes.forEach((checkboxWrapper) => {
      if (checkboxWrapper.tagName && checkboxWrapper.tagName.toLowerCase() === 'div') {
        checkboxWrapper.childNodes.forEach((checkbox) => {
          if (checkbox.tagName && checkbox.tagName.toLowerCase() === 'input') {
            checkbox.checked = false
          }
        })
      }
    })
  }

  const goToCalendarPage = () => {
    addClass(CalendarPage, 'show')
    removeClass(CalendarPage, 'hide')
    addClass(AddNewMeetingPage, 'hide')
    removeClass(AddNewMeetingPage, 'show')
    hideAddMeetingErrorMessage()
    clearFormData()
  }

  $cancelBtn.addEventListener('click', goToCalendarPage)
  $cancelBtn.addEventListener('unload', () => {
    $cancelBtn.removeEventListener('click', goToCalendarPage)
  })

  const createAndSaveMeetingData = () => {
    const formData = createFormData(
      $newEventNameInput.value,
      $daysSelect.value,
      $timeSelect.value,
      `${$timeSelect.value} ${$daysSelect.value.slice(0, 3)}`
    )

    $checkboxes.childNodes.forEach((checkboxWrapper) => {
      if (checkboxWrapper.tagName && checkboxWrapper.tagName.toLowerCase() === 'div') {
        checkboxWrapper.childNodes.forEach((checkbox) => {
          if (checkbox.tagName && checkbox.tagName.toLowerCase() === 'input') {
            if (checkbox.checked) {
              formData.participants.push(checkbox.id)
            }
          }
        })
      }
    })

    $newEventNameInput.isValid = $newEventNameInput.value.trim().length >= 2

    if (!$newEventNameInput.isValid) {
      addClass($nameFieldErrorMessage, 'showErrorMessage')
      removeClass($nameFieldErrorMessage, 'hideErrorMessage')

      if ($newEventNameInput.value.trim().length === 0) {
        $nameFieldErrorMessage.textContent = 'Enter the field'
      } else if ($newEventNameInput.value.trim().length === 1) {
        $nameFieldErrorMessage.textContent = 'Name of the event is too short'
      }
    } else {
      addClass($nameFieldErrorMessage, 'hideErrorMessage')
      removeClass($nameFieldErrorMessage, 'showErrorMessage')
    }

    if (formData.participants.length === 0) {
      addClass($checkboxesErrorMessage, 'showErrorMessage')
      removeClass($checkboxesErrorMessage, 'hideErrorMessage')
    } else {
      addClass($checkboxesErrorMessage, 'hideErrorMessage')
      removeClass($checkboxesErrorMessage, 'showErrorMessage')
    }

    isFormValid = $newEventNameInput.isValid && formData.participants.length

    if (isFormValid) {
      $calendarTableCell.forEach((cell) => {
        if (cell.id === formData.id) {
          serverEventsMethods.getAllMeetings()
            .then((meetings) => meetings.filter((meeting) => meeting.data.id === cell.id))
            .then((meeting) => {
              if (meeting.length) {
                showAddMeetingErrorMessage()
              } else {
                serverEventsMethods.addNewMeeting(formData)
                  .then(serverEventsMethods.getAllMeetings)
                  .then((meetings) => {
                    localStorage.setItem('meetings', JSON.stringify(meetings))
                    CalendarTable.innerHTML = createCalendarTableTemplate()
                    displayPlanedMeetings(meetings)
                  })
                  .then(() => {
                    clearFormData()
                    hideAddMeetingErrorMessage()
                    addClass(CalendarPage, 'show')
                    removeClass(CalendarPage, 'hide')
                    addClass(AddNewMeetingPage, 'hide')
                    removeClass(AddNewMeetingPage, 'show')
                  })
              }
            })
        }
      })
    }
  }

  document.addEventListener('DOMContentLoaded', countMarginForTitle)

  $addNewMeetingBtn.addEventListener('click', createAndSaveMeetingData)
  $addNewMeetingBtn.addEventListener('unload', () => {
    $addNewMeetingBtn.removeEventListener('click', createAndSaveMeetingData)
  })

  $hideAddMeetingErrorMessage.addEventListener('click', hideAddMeetingErrorMessage)
  $hideAddMeetingErrorMessage.addEventListener('unload', () => {
    $hideAddMeetingErrorMessage.removeEventListener('click', hideAddMeetingErrorMessage)
  })
}
