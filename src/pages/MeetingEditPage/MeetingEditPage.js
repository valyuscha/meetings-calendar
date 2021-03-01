import {errorIcon, hideErrorMessage} from '@assets'
import {addClass} from '@/helpers'
import {Checkboxes, Input, Select} from '@components/UI'
import {days, time} from '@server'
import './meetingEditPageFunctionality'
import './style.scss'

export const meetingEditPageTemplate = () => {
  const users = JSON.parse(localStorage.getItem('usersList'))

  return `
    <h2 id="editMeetingTitle" class="meeting-edit__title">Edit meeting</h2>  
    <div class="meeting-edit__field-wrapper">
      ${Input({
        id: 'meetingEditName',
        errorMessageId: 'meetingEditNameErrorMessage',
        label: 'Name of the event:',
        isValid: false,
        isTouched: false,
        placeholder: 'Enter the field',
        errorMessage: 'Error'
      })}
    </div>
    <div class="meeting-edit__field-wrapper">
      ${Select({id: 'editDaysSelect', optionsArr: days, label: 'Day:'})}
    </div>
    <div class="meeting-edit__field-wrapper">
      ${Select({id: 'editTimeSelect', optionsArr: time, label: 'Time:'})}
    </div>
    <div id="editCheckboxes" class="meeting-edit__checkboxes_wrapper">
      <p class="meeting-edit__checkboxes_title">Participants:</p>
      ${Checkboxes({className: 'meeting-edit__checkbox', checkboxesList: users})}
      <p id="checkboxesErrorMessage" class="errorMessage hideErrorMessage">
        Select at least one participant
      </p>
    </div>
    <div class="meeting-edit__buttons">
      <button id="editMeetingCancelBtn">Cancel</button>
      <button id="editMeetingBtn">Edit</button>
    </div>
    <div id="meetingEditErrorMessage" class="meeting-edit__error-message_wrapper hide-edit-meeting-error-message">
      <div class="meeting-edit__error-message">
        <img src="${errorIcon}" alt="">
        <p>Failed to create an event. Time slot is already booked.</p>
      </div>
      <div class="meeting-edit__error-message_hide-button">
        <button>
          <img id="hideEditMeetingErrorMessage" src="${hideErrorMessage}" alt="">
        </button>
      </div>  
    </div>
  `
}

const MeetingEditPage = document.createElement('div')
MeetingEditPage.innerHTML = meetingEditPageTemplate()
addClass(MeetingEditPage, 'meeting-edit__wrapper')
addClass(MeetingEditPage, 'hide')

// export default MeetingEditPage