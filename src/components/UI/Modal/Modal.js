import './style.scss'

const Modal = () => {
  return `
    <div class="modal">
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
    </div>
  `
}

export default Modal