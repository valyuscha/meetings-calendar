import { addClass } from '@/helpers'
import { Modal, Select } from '@components/UI'
import './style.scss'

export const createAuthModalTemplate = () => {
  const users = JSON.parse(localStorage.getItem('usersList'))

  return `
    <p class="modal__auth-message">Please authorise</p>
    ${Select({
    className: 'modal__users-select',
    optionsArr: users,
    id: 'modalMeetingsSelect',
  })}
    <button id="confirmAuthBtn" class="modal__confirm-button">Confirm</button>
  `
}

const AuthorizeModal = document.createElement('div')
addClass(AuthorizeModal, 'modal__wrapper')
AuthorizeModal.id = 'authorizeModal'

AuthorizeModal.innerHTML = Modal(createAuthModalTemplate())

export default AuthorizeModal
