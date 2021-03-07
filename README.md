# Calendar of meetings
This app is created for office work. It creates the schedule of office meetings.

### Project start instruction:
First of all you need to clone this repository on your computer. Then you need to write `npm install` in your 
terminal. That's all. Now you can write `npm run start` or `npm start` in your terminal and then the website would be
 opened.

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

### Scripts of application launch process
1. start - use `npm run start` or `npm start` to run the project on `localhost:3000`.
1. build - use `npm run build` or `npm build` to build the project into production (minified) version.
1. dev - use `npm run dev` or `npm dev` to build the project into development version.
1. test - use `npm run test` or `npm test` to run all tests of the project.