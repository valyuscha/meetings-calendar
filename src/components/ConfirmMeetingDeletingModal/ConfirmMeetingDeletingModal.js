import {addClass} from '@/helpers'
import {Modal} from '@components/UI'
import './style.scss'

const ConfirmMeetingDeletingModal = document.createElement('div')
addClass(ConfirmMeetingDeletingModal, 'hide')
addClass(ConfirmMeetingDeletingModal, 'modal__wrapper')
ConfirmMeetingDeletingModal.id = 'confirmModal'
ConfirmMeetingDeletingModal.innerHTML = Modal(`
  <p class="modal__message">
    Are you sure you want to delete 
    <span class="modal__message_meeting-name_wrapper">"<span
      id="modalMessageMeetingName"
      class="modal__message_meeting-name">Event</span>"</span>
    </span> event
  </p>
  <div class="modal__buttons">
    <button id="cancelDeleteMeetingBtn">No</button>
    <button id="confirmDeleteMeetingBtn">Yes</button>
  </div>
`)

export default ConfirmMeetingDeletingModal