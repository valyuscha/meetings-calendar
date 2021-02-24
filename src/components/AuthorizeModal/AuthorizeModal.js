import {addClass} from '@/helpers'
import {Modal, Select} from '@components/UI'
import {users} from '@server'
import './style.scss'

const AuthorizeModal = document.createElement('div')
addClass(AuthorizeModal, 'modal__wrapper')
AuthorizeModal.id = 'authorizeModal'
AuthorizeModal.innerHTML = Modal(`
  <p class="modal__auth-message">Please authorise</p>
  ${Select({
    className: 'modal__users-select',
    optionsArr: users,
    id: 'modalMeetingsSelect',
  })}
  <button id="confirmAuthBtn" class="modal__confirm-button">Confirm</button>
`)

export default AuthorizeModal