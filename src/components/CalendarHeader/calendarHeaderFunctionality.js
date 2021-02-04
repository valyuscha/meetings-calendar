import render from '@/index'

document.addEventListener('DOMContentLoaded', () => {
  const $meetingsFilterSelect = document.getElementById('meetingsFilterSelect')
  const $addNewMeetingButton = document.getElementById('addNewMeetingButton')
  localStorage.setItem('filters', $meetingsFilterSelect.value)

  $meetingsFilterSelect.addEventListener('change', () => {
    localStorage.setItem('filters', $meetingsFilterSelect.value)
  })

  $addNewMeetingButton.addEventListener('click', () => {
    localStorage.setItem('activePage', 'Add new meeting page')
    render()
  })
})