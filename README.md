# Calendar of meetings
This app is created for office work. It creates the schedule of office meetings.

### Instructions for using the web app:
1. When you load project at first time you can see calendar page with empty table.
1. You can create new meeting by clicking `New event+` button. Then you will see form which helps to create new event. Notice that you cannot create new meeting which has no name and/or no one participant.
After you have filled out the form you can click `Create` button and add new meeting. After that you would be redirected to calendar page where you would see your meeting. 
If you try to add a meeting for the day and time when another meeting is already scheduled, you will see an error message that this time is already taken.
1. On the calendar page you can see select with the list of users. It helps you to see only those meetings in which the one you chose in the select participates.
1. You can delete meeting by clicking `x` button in the cell near the planed meeting. You would see the confirm message which asks if you really want to delete the meeting. If you click `yes` 
the meeting would be deleted. If you click `no` the confirm message would just be hidden without deleting the meeting.
1. You can see all information about current meeting if you click the cell with the planed meeting. Then you would be redirected to the meeting info page.
1. You can edit meeting info by clicking the `pencil icon` on the meeting info page. You would be redirected on edit meeting info page. The logic of this page is like the logic of 
add new meeting page but instead of creating new event you would edit meeting which is created already. If you click `Cancel` button you would go back to meeting info page without 
editing the meeting. If you click `Edit` button the meeting would be edited and you would come back to meeting info page where you would see edited info.

### Used technologies:
1. HTML
1. SCSS
1. JavaScript
1. Webpack
1. Babel 

(All data of created meetings is saved in your localStorage)