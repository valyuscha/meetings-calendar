import {editMeeting, goBack} from '@assets'
import {addClass} from '@/helpers'
import './meetingInfoPageFunctionality'
import './style.scss'

const meetingInfoTemplate = () => {
  const activeUser = JSON.parse(localStorage.getItem('activeUser'))
  const editMeetingBtnClass = []

  if (activeUser && activeUser.canUserEditMeetingInfo) {
    editMeetingBtnClass.push('show')
  } else {
    editMeetingBtnClass.push('hide')
  }

  return `
    <div class="meeting-info__header">
      <div class="meeting-info__header_left-part">
        <button id="goBackToCalendarPageBtn">
          <img src="${goBack}" alt="">
        </button>
        <h2 id="meetingInfoTitle">Meeting name</h2>
      </div>
      <button id="goToEditMeetingPageBtn" class="${editMeetingBtnClass.join(' ')}">
        <img src="${editMeeting}" alt="">
      </button>
    </div>  
    <div class="meeting-info__item_wrapper">
      <p id="meetingNameLabel" class="meeting-info__item_name">Item name:</p>
      <p id="meetingNameValue" class="meeting-info__item_value">item value</p>
    </div>
    <div class="meeting-info__item_wrapper">
      <p id="dayLabel" class="meeting-info__item_name">Item name:</p>
      <p id="dayValue" class="meeting-info__item_value">item value</p>
    </div>
    <div class="meeting-info__item_wrapper">
      <p id="timeLabel" class="meeting-info__item_name">Item name:</p>
      <p id="timeValue" class="meeting-info__item_value">item value</p>
    </div>
    <div class="meeting-info__item_wrapper">
      <p id="participantsLabel" class="meeting-info__item_name">Item name:</p>
      <ul id="participantsValue">
        <li class="meeting-info__item_value">item value</li>
      </ul>
    </div>
  ` 
}

const MeetingInfoPage = document.createElement('div')
addClass(MeetingInfoPage, 'meeting-info__wrapper')
addClass(MeetingInfoPage, 'hide')
MeetingInfoPage.id = 'meetingInfoPage'
MeetingInfoPage.innerHTML = meetingInfoTemplate()

export default MeetingInfoPage