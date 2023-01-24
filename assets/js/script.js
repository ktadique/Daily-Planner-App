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
    - get task object backfrom local storage
    
    */
//---------------------------

//global variables
let timeBlockContainer = $(".container");
let currentDay = $("#currentDay");
let timeEl = $("<p>");

//Header Date/Time
function renderDate() {
  let todaysDate = moment().format("dddd Do MMMM YYYY,");
  currentDay.text(todaysDate);
}

function drawTime() {
  let headerContainer = $(".jumbotron");
  timeEl.addClass("h3");
  headerContainer.append(timeEl);
}
function renderTime() {
  let currentTime = moment().format("h:mm:ss A");
  timeEl.text(currentTime);
}

function currentHour() {
  return moment().hour();
}

renderDate();
drawTime();
renderTime();
setInterval(renderTime, 1000);

//time blocks
//to-do: Make more code DRY
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
  let timeBlockRow = $("<div>").attr("class", "row");
  timeBlockContainer.append(timeBlockRow);

  //time label
  let timeLabel = $("<div>").attr("class", "col-1 hour text-center");
  timeLabel.text(`${convertedWorkHours[i]}`);
  timeBlockRow.append(timeLabel);

  //text area
  let taskInput = $("<textarea>").attr("id", "row-" + i);
  timeBlockRow.append(taskInput);

  $("#row-" + i).text(localStorage.getItem("task-" + i));

  //button
  let saveBtn = $("<button>").attr("id", i);
  saveBtn.attr("onClick", "saveTasks(this)");
  saveBtn.addClass("col-1 saveBtn");
  timeBlockRow.append(saveBtn);

  // floppy disk icon
  let floppyDisk = $("<i>").attr("class", "fa-solid fa-floppy-disk");
  saveBtn.append(floppyDisk);

  /* if (currentHour() == workHours[i]) {
    //show red
    taskInput.addClass("col-10 text-dark present");
  } else if (currentHour() < workHours[i]) {
    //show green
    taskInput.addClass("col-10 text-dark future");
  } else {
    //show gray
    taskInput.addClass("col-10 text-dark past");
  } */
}
//color logic
function colorChange() {
  for (i = 0; i < workHours.length; i++) {
    let taskInput = $("#row-" + i);
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

function saveTasks(elem) {
  let taskInputText = "#row-" + elem.id;
  let tasks = "task-" + elem.id;
  localStorage.setItem(tasks, $(taskInputText).val());
}

colorChange();
setInterval(colorChange, 60000);
