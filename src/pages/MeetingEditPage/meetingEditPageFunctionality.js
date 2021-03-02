import {addClass, removeClass} from '@/helpers'
import {displayPlanedMeetings} from '@components/CalendarTable/CalendarTable'
import CalendarTable, {createCalendarTableTemplate} from '@components/CalendarTable/calendarTableLayout'
import {MeetingInfoPage} from '@pages'
import {serverEventsMethods} from '@/serverCommunication'

export const addMeetingEditPageFunctionality = () => {
  const $editMeetingCancelBtn = document.getElementById('editMeetingCancelBtn')
  const $editMeetingBtn = document.getElementById('editMeetingBtn')
  const $editMeetingTitle = document.getElementById('editMeetingTitle')
  const $meetingEditName = document.getElementById('meetingEditName')
  const $daysSelect = document.getElementById('editDaysSelect')
  const $timeSelect = document.getElementById('editTimeSelect')
  const $checkboxes = document.getElementById('editCheckboxes')
  const $nameFieldErrorMessage = document.getElementById('meetingEditNameErrorMessage')
  const $checkboxesErrorMessage = document.getElementById('checkboxesErrorMessage')
  const $editMeetingErrorMessage = document.getElementById('meetingEditErrorMessage')
  const $calendarTableCell = document.querySelectorAll('.calendar-table__cell_meetings')
  const $hideEditMeetingErrorMessage = document.getElementById
  ('hideEditMeetingErrorMessage')
  const $meetingInfoTitle = document.getElementById('meetingInfoTitle')
  const $meetingNameValue = document.getElementById('meetingNameValue')
  const $dayValue = document.getElementById('dayValue')
  const $timeValue = document.getElementById('timeValue')
  const $participantsValue = document.getElementById('participantsValue')
  const $meetingEditPage = document.getElementById('meetingEditPage')
  let isFormValid = false


  const countMarginForTitle = () => {
    if ($editMeetingErrorMessage.classList.contains('show-edit-meeting-error-message')) {
      $editMeetingTitle.style.marginTop = '40px'
      $editMeetingTitle.style.transition = 'margin-top .5s'
    } else {
      $editMeetingTitle.style.marginTop = '0'
      $editMeetingTitle.style.transition = 'margin-top .5s'
    }
  }

  const showEditMeetingErrorMessage = () => {
    addClass($editMeetingErrorMessage, 'show-edit-meeting-error-message')
    removeClass($editMeetingErrorMessage, 'hide-edit-meeting-error-message')
    countMarginForTitle()
    return $editMeetingErrorMessage
  }

  const hideEditMeetingErrorMessage = () => {
    addClass($editMeetingErrorMessage, 'hide-edit-meeting-error-message')
    removeClass($editMeetingErrorMessage, 'show-edit-meeting-error-message')
    countMarginForTitle()
    return $editMeetingErrorMessage
  }

  const cancelMeetingEdit = () => {
    addClass($meetingEditPage, 'hide')
    removeClass($meetingEditPage, 'show')
    addClass(MeetingInfoPage, 'show')
    removeClass(MeetingInfoPage, 'hide')
    hideEditMeetingErrorMessage()
  }

  const editMeeting = () => {
    const formData = {}
    formData.meetingName = $meetingEditName.value
    formData.selectedDay = $daysSelect.value
    formData.selectedTime = $timeSelect.value
    formData.participants = []
    formData.id = `${$timeSelect.value} ${$daysSelect.value.slice(0, 3)}`

    $checkboxes.childNodes.forEach(checkbox => {
      if (checkbox.classList && checkbox.classList.contains('meeting-edit__checkbox')) {
        const checkboxField = checkbox.childNodes[3]
        if (checkboxField.checked) {
          formData.participants.push(checkboxField.id)
        }
      }
    })

    $meetingEditName.isValid = $meetingEditName.value.trim().length >= 2

    if (!$meetingEditName.isValid) {
      addClass($nameFieldErrorMessage, 'showErrorMessage')
      removeClass($nameFieldErrorMessage, 'hideErrorMessage')

      if ($meetingEditName.value.trim().length === 0) {
        $nameFieldErrorMessage.textContent = 'Enter the field'
      } else if ($meetingEditName.value.trim().length === 1) {
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

    isFormValid = $meetingEditName.isValid && formData.participants.length !== 0

    if (isFormValid) {
      $calendarTableCell.forEach(cell => {
        if (cell.id === formData.id) {
          serverEventsMethods.getAllMeetings()
            .then(meetings => meetings.filter(meeting => meeting.data.id === cell.id))
            .then(meeting => {
              const editMeeting = JSON.parse(localStorage.getItem('editMeeting'))
              if (cell.id !== editMeeting.data.id && meeting.length) {
                showEditMeetingErrorMessage()
              } else {
                serverEventsMethods.editMeetingInfo(formData, editMeeting.id)
                  .then(serverEventsMethods.getAllMeetings)
                  .then(meetings => {
                    localStorage.setItem('meetings', JSON.stringify(meetings))
                    CalendarTable.innerHTML = createCalendarTableTemplate()
                    displayPlanedMeetings(meetings)
                  })
                  .then(() => {
                    $meetingInfoTitle.textContent = formData.meetingName
                    $meetingNameValue.textContent = formData.meetingName
                    $dayValue.textContent = formData.selectedDay
                    $timeValue.textContent = formData.selectedTime
                    $participantsValue.innerHTML = formData.participants
                      .map(participant => `
                    <li class="meeting-info__item_value">${participant}</li>
                  `).join(' ')
                    hideEditMeetingErrorMessage()
                    addClass(MeetingInfoPage, 'show')
                    removeClass(MeetingInfoPage, 'hide')
                    addClass($meetingEditPage, 'hide')
                    removeClass($meetingEditPage, 'show')
                  })
              }
            })
        }
      })
    }
  }

  $editMeetingCancelBtn.addEventListener('click', cancelMeetingEdit)
  $editMeetingCancelBtn.addEventListener('unload', () => {
    $editMeetingCancelBtn.removeEventListener('click', cancelMeetingEdit)
  })

  $editMeetingBtn.addEventListener('click', editMeeting)
  $editMeetingBtn.addEventListener('unload', () => {
    $editMeetingBtn.removeEventListener('click', editMeeting)
  })

  $hideEditMeetingErrorMessage.addEventListener('click', hideEditMeetingErrorMessage)
  $hideEditMeetingErrorMessage.addEventListener('unload', () => {
    $hideEditMeetingErrorMessage.removeEventListener('click', hideEditMeetingErrorMessage)
  })
}