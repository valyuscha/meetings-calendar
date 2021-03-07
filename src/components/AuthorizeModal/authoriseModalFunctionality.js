import { addClass, removeClass } from '@/helpers'
import AuthorizeModal from './AuthorizeModal'

export const authorizeModalFunctionality = () => {
  const $confirmAuthBtn = document.getElementById('confirmAuthBtn')
  const $modalMeetingsSelect = document.getElementById('modalMeetingsSelect')
  const $goToAddNewMeetingPageBtn = document.getElementById('goToAddNewMeetingPageBtn')
  const $deleteMeetingBtns = document.querySelectorAll('.delete-meeting')
  const $goToEditMeetingPageBtn = document.getElementById('goToEditMeetingPageBtn')

  const login = () => {
    const users = JSON.parse(localStorage.getItem('usersList'))
    users.filter((user) => {
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

        $deleteMeetingBtns.forEach((btn) => {
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

  $confirmAuthBtn.addEventListener('click', login)
  $confirmAuthBtn.addEventListener('unload', () => {
    $confirmAuthBtn.removeEventListener('click', login)
  })
}
