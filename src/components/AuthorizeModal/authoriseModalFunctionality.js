import AuthorizeModal from './AuthorizeModal'
import {addClass, removeClass} from '@/helpers'

export const authorizeModalFunctionality = () => {
  const $confirmAuthBtn = document.getElementById('confirmAuthBtn')
  const $modalMeetingsSelect = document.getElementById('modalMeetingsSelect')
  const $goToAddNewMeetingPageBtn = document.getElementById('goToAddNewMeetingPageBtn')
  const $deleteMeetingBtns = document.querySelectorAll('.delete-meeting')
  const $goToEditMeetingPageBtn = document.getElementById('goToEditMeetingPageBtn')

  $confirmAuthBtn.addEventListener('click', () => {
    const users = JSON.parse(localStorage.getItem('usersList'))
    if (users) {
      users.filter(user => {
        if (user.name === $modalMeetingsSelect.value) {
          localStorage.setItem('activeUser', JSON.stringify(user))
          addClass(AuthorizeModal, 'hide')

          if (user.canUserCreateMeeting) {
            addClass($goToAddNewMeetingPageBtn, 'show')
            removeClass($goToAddNewMeetingPageBtn, 'hide')
          } else {
            addClass($goToAddNewMeetingPageBtn, 'hide')
            removeClass($goToAddNewMeetingPageBtn, 'show')
          }

          $deleteMeetingBtns.forEach(btn => {
            if (user.canUserDeleteMeeting) {
              addClass(btn, 'show')
              removeClass(btn, 'hide')
            } else {
              addClass(btn, 'hide')
              removeClass(btn, 'show')
            }
          })

          if (user.canUserEditMeetingInfo) {
            addClass($goToEditMeetingPageBtn, 'show')
            removeClass($goToEditMeetingPageBtn, 'hide')
          } else {
            addClass($goToEditMeetingPageBtn, 'hide')
            removeClass($goToEditMeetingPageBtn, 'show')
          }
        }
      })
    }
  })
}