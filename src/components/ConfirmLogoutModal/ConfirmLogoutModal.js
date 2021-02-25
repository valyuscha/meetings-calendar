import {addClass} from '@/helpers'
import {Modal} from '@components/UI'
import './confirmLgoutModalFunctionality'
import './style.scss'

const ConfirmLogoutModal = document.createElement('div')
addClass(ConfirmLogoutModal, 'modal__wrapper')
addClass(ConfirmLogoutModal, 'hide')
ConfirmLogoutModal.id = 'authorizeModal'
ConfirmLogoutModal.innerHTML = Modal(`
  <p class="modal__confirm-logout-message">Do you really want to logout?</p> 
  <div class="modal__confirm-buttons">
    <button id="cancelLogoutBtn">No</button>
    <button id="confirmLogoutBtn">Yes</button>
  </div>
`)

export default ConfirmLogoutModal