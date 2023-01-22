"strict code";

//---------------------------
//Work Day Scheduler TODO/Psuedocode
//---------------------------
/*

-Title that displays current day, date and month at the top of the planner:
  -Select "currentDay" jquery $("#currentDay") assign to currentDay
  -using moment.js, render current date (dddd,Do,MMMM,YYYY), asign to todaysDate
  -render currentTime, asign to currentTime (h:mm:ss A)
  -setInterval to update time
  -use moment.js to asign currentHour
  

-Time blocks for standard 9-5 work day, color coded depending on current hour with save button:
  -Assign timeBlockContainer to $(".container")
  -Select contrainer class and render 9 divs with class ".time-block", dynamically.
    -Create workHour array (9 - 5, am, pm)
    -FOR every workHour
    -  Render and append time-block row
  -Create logic to change appearance of scheduler depending on current time
    -IF workHour is LESS THAN currentHour, change to ".past" style
    -ELSE IF workHour is MORE THAN currentHour, change to ".future" style
    -ELSE workHour is EQUAL to currentHour, change style to ".present"

-Ability to input tasks inside rows:
  -Event listener on taskBox submit
  -Create form for each time-block with name/id "taskBox"

-Tasks are savable and persist even after refresh
  - Event listener on saveBtn click
  - Select form element by its `name` attribute and get its value:
      - LET textInput = Text Input $('input[name="taskInput"]').val();
    - set taskObject into Local storage:
    - SAVE textInput into local storage
    - Stringify and parse back onto current row
  
*/
//---------------------------

//global variables
let timeBlockContainer = $(".container");
let currentDay = $("#currentDay");
let timePar = $("<p>");

//Header Date/Time
function renderDate() {
  let todaysDate = moment().format("dddd Do MMMM YYYY,");
  currentDay.text(todaysDate);
}

function drawTime() {
  let headerContainer = $(".jumbotron");
  timePar.addClass("h3");
  headerContainer.append(timePar);
}

function renderClock() {
  drawTime();
  let currentTime = moment().format("h:mm:ss A");
  timePar.text(currentTime);
}

function currentHour() {
  let currentHour = moment().hour();
  return currentHour;
}

renderDate();
renderClock();
setInterval(renderClock, 1000);

//time blocks

let timeBlockRow;
let workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
let convertedWorkHours = [
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
];

for (i = 0; i < workHours.length; i++) {
  //to-do: find out why i have to reassign everyloop to correctly append
  timeBlockRow = $('<div class="row"></div>');
  timeBlockContainer.append(timeBlockRow);

  //to-do: align time to center veritcally
  if (currentHour() == workHours[i]) {
    timeBlockRow.append(
      $(`<div class="col-1 hour text-center">${convertedWorkHours[i]}</div>`),
      $('<textarea class="col-10 present description">'),
      $('<button class="col-1 saveBtn"> 🖫 </button>')
    );
  } else if (currentHour() < workHours[i]) {
    timeBlockRow.append(
      $(`<div class="col-1 hour text-center">${convertedWorkHours[i]}</div>`),
      $('<textarea class="col-10 future description">'),
      $('<button class="col-1 saveBtn"> 🖫 </button>')
    );
  } else {
    timeBlockRow.append(
      $(`<div class="col-1 hour text-center"> ${convertedWorkHours[i]} </div>`),
      $('<textarea class="col-10 past description">'),
      $('<button class="col-1 saveBtn"> 🖫 </button>')
    );
  }
}
