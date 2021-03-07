import { Input, Select, Checkboxes } from '@components/UI'
import { addClass } from '@/helpers'
import { days, time } from '@server'
import { errorIcon, hideErrorMessage } from '@assets'
import './style.scss'

export const addNewMeetingPageTemplate = () => {
  const users = JSON.parse(localStorage.getItem('usersList'))

  return `
    <h2 id="addMeetingTitle" class="add-meeting__title">Create new meeting</h2>
    <div class="add-meeting__field-wrapper">
      ${Input({
    id: 'newEventName',
    errorMessageId: 'addNewMeetingNameErrorMessage',
    label: 'Name of the event:',
    isValid: false,
    isTouched: false,
    placeholder: 'Enter the field',
    errorMessage: 'Error',
  })}
    </div>
    <div class="add-meeting__field-wrapper">
      ${Select({ id: 'daysSelect', optionsArr: days, label: 'Day:' })}
    </div>
    <div class="add-meeting__field-wrapper">
      ${Select({ id: 'timeSelect', optionsArr: time, label: 'Time:' })}
    </div>
    <div id="addNewMeetingCheckboxes" class="add-meeting__checkboxes_wrapper">
      <p class="add-meeting__checkboxes_title">Participants:</p>
      ${Checkboxes({ className: 'add-meeting__checkbox', checkboxesList: users })}
      <p
        id="addNewMeetingCheckboxesErrorMessage"
        class="errorMessage hideErrorMessage">
        Select at least one participant
      </p>
    </div>
    <div class="add-meeting__buttons">
      <button id="cancelBtn">Cancel</button>
      <button id="addNewMeetingBtn">Create</button>
    </div>
    <div
      id="addNewMeetingErrorMessage"
      class="add-meeting__error-message_wrapper hide-add-meeting-error-message">
      <div class="add-meeting__error-message">
        <img src="${errorIcon}" alt="">
        <p>Failed to create an event. Time slot is already booked.</p>
      </div>
      <div class="add-meeting__error-message_hide-button">
        <button>
          <img id="hideAddMeetingErrorMessage" src="${hideErrorMessage}" alt="">
        </button>
      </div>  
    </div>
  `
}

const AddNewMeetingPage = document.createElement('div')
addClass(AddNewMeetingPage, 'add-meeting__wrapper')
addClass(AddNewMeetingPage, 'hide')
AddNewMeetingPage.innerHTML = addNewMeetingPageTemplate()

export default AddNewMeetingPage
