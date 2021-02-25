import AuthorizeModal from '@components/AuthorizeModal/AuthorizeModal'
import ConfirmLogoutModal from './ConfirmLogoutModal'
import {addClass, removeClass} from '@/helpers'

document.addEventListener('DOMContentLoaded', () => {
  const $cancelLogoutBtn = document.getElementById('cancelLogoutBtn')
  const $confirmLogoutBtn = document.getElementById('confirmLogoutBtn')

  const cancelLogout = () => {
    addClass(ConfirmLogoutModal, 'hide')
    removeClass(ConfirmLogoutModal, 'show')
  }

  const confirmLogout = () => {
    localStorage.removeItem('activeUser')
    addClass(AuthorizeModal, 'show')
    removeClass(AuthorizeModal, 'hide')
    addClass(ConfirmLogoutModal, 'hide')
    removeClass(ConfirmLogoutModal, 'show')
  }

  $cancelLogoutBtn.addEventListener('click', cancelLogout)
  $cancelLogoutBtn.addEventListener('unload', () => {
    $cancelLogoutBtn.removeEventListener('click', cancelLogout)
  })

  $confirmLogoutBtn.addEventListener('click', confirmLogout)
  $confirmLogoutBtn.addEventListener('unload', () => {
    $confirmLogoutBtn.removeEventListener('click', confirmLogout)
  })
})