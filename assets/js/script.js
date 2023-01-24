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
    -Create workHour array (9 - 17)
    -FOR every workHour
    -  Render and append time-block row
  -Create logic to change appearance of scheduler depending on current time
    -IF workHour is LESS THAN currentHour, change to ".past" style
    -ELSE IF workHour is MORE THAN currentHour, change to ".future" style
    -ELSE workHour is EQUAL to currentHour, change style to ".present"
    
    -Ability to input tasks inside rows:
    -Create task for each time-block with name/id "row - [workhours.length]"

    -Tasks are savable and persist even after refresh
    - Event listener on saveBtn click
    - set written task and task row into local storage using setItem
    - display tasks onto respective row using getItem
    
    */
//---------------------------

//Header Date/Time

let timeBlockContainer = $(".container");
let currentDay = $("#currentDay");
let timeEl = $("<p>");

//function to render date followingthis format
function renderDate() {
  let todaysDate = moment().format("dddd Do MMMM YYYY,");
  currentDay.text(todaysDate);
}

//creates the time element beneath the date
function drawTime() {
  let headerContainer = $(".jumbotron");
  timeEl.addClass("h3");
  headerContainer.append(timeEl);
}

//renders the time to screen following this format
function renderTime() {
  let currentTime = moment().format("h:mm:ss A");
  timeEl.text(currentTime);
}

//returns the current hour
function currentHour() {
  return moment().hour();
}

renderDate();
drawTime();
renderTime();

//actively updates the time every second
setInterval(renderTime, 1000);

//time blocks
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

//creates the rows based on workHours array length in a loop
for (i = 0; i < workHours.length; i++) {
  let timeBlockRow = $("<div>").attr("class", "row");
  timeBlockContainer.append(timeBlockRow);

  //time label
  let timeLabel = $("<div>").attr("class", "col-1 hour text-center");
  timeLabel.text(`${convertedWorkHours[i]}`);
  timeBlockRow.append(timeLabel);

  //text area
  let taskInput = $("<textarea>").attr("id", "row-" + i);
  timeBlockRow.append(taskInput);

  //gets saved task from local storage and displays it in the text area
  $("#row-" + i).text(localStorage.getItem("task-" + i));

  //button
  let saveBtn = $("<button>").attr("id", i);
  //pass the button through the saveTask function on click
  saveBtn.attr("onClick", "saveTasks(this)");
  saveBtn.addClass("col-1 saveBtn");
  timeBlockRow.append(saveBtn);

  // floppy disk icon
  let floppyDisk = $("<i>").attr("class", "fa-solid fa-floppy-disk");
  saveBtn.append(floppyDisk);
}
//color logic
function colorChange() {
  for (i = 0; i < workHours.length; i++) {
    let taskInput = $("#row-" + i);
    taskInput.removeClass();
    if (currentHour() == workHours[i]) {
      //show red
      taskInput.addClass("col-10 text-dark present");
    } else if (currentHour() < workHours[i]) {
      //show green
      taskInput.addClass("col-10 text-dark future");
    } else {
      //show gray
      taskInput.addClass("col-10 text-dark past");
    }
  }
}

//save function

//using the button id, save tasks into local storage
function saveTasks(elem) {
  let taskInputText = "#row-" + elem.id;
  let tasks = "task-" + elem.id;
  localStorage.setItem(tasks, $(taskInputText).val());
}

colorChange();
//runs the colorchange function every minute
setInterval(colorChange, 60000);
