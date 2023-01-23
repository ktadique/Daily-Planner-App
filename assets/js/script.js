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

function renderTime() {
  drawTime();
  let currentTime = moment().format("h:mm:ss A");
  timePar.text(currentTime);
}

function currentHour() {
  let currentHour = moment().hour();
  return currentHour;
}

function clock() {
  renderTime();
  currentHour();
}

renderDate();
setInterval(clock, 1000);

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
    //show red
    timeBlockRow.append(
      $(`<div class="col-1 hour text-center">${convertedWorkHours[i]}</div>`),
      $(`<textarea id="row${workHours[i]}" class="col-10 text-dark present">`),
      $(
        `<button id="btn${workHours[i]}" class="col-1 saveBtn"><i class="fa-solid fa-floppy-disk">`
      )
    );
  } else if (currentHour() < workHours[i]) {
    //show green
    timeBlockRow.append(
      $(`<div class="col-1 hour text-center">${convertedWorkHours[i]}</div>`),
      $(`<textarea id="row${workHours[i]}" class="col-10 text-dark future">`),
      $(
        `<button id="btn${workHours[i]}" class="col-1 saveBtn"><i class="fa-solid fa-floppy-disk">`
      )
    );
  } else {
    //show gray
    timeBlockRow.append(
      $(`<div class="col-1 hour text-center"> ${convertedWorkHours[i]} </div>`),
      $(`<textarea id="row${workHours[i]}" class="col-10 text-dark past">`),
      $(
        `<button id="btn${workHours[i]}" class="col-1 saveBtn"><i class="fa-solid fa-floppy-disk">`
      )
    );
  }
}

//save function

function saveTasks() {
  $("#btn9").on("click", function () {
    localStorage.setItem("task9", JSON.stringify($("#row9").val()));
  });
  $("#btn10").on("click", function () {
    localStorage.setItem("task10", JSON.stringify($("#row10").val()));
  });
  $("#btn11").on("click", function () {
    localStorage.setItem("task11", JSON.stringify($("#row11").val()));
  });
  $("#btn12").on("click", function () {
    localStorage.setItem("task12", JSON.stringify($("#row12").val()));
  });
  $("#btn13").on("click", function () {
    localStorage.setItem("task13", JSON.stringify($("#row13").val()));
  });
  $("#btn14").on("click", function () {
    localStorage.setItem("task14", JSON.stringify($("#row14").val()));
  });
  $("#btn15").on("click", function () {
    localStorage.setItem("task15", JSON.stringify($("#row15").val()));
  });
  $("#btn16").on("click", function () {
    localStorage.setItem("task16", JSON.stringify($("#row16").val()));
  });
  $("#btn17").on("click", function () {
    localStorage.setItem("task17", JSON.stringify($("#row17").val()));
  });
}

saveTasks();

function recallTasks() {
  $("#row9").text(JSON.parse(localStorage.getItem("task9")));
  $("#row10").text(JSON.parse(localStorage.getItem("task10")));
  $("#row11").text(JSON.parse(localStorage.getItem("task11")));
  $("#row12").text(JSON.parse(localStorage.getItem("task12")));
  $("#row13").text(JSON.parse(localStorage.getItem("task13")));
  $("#row14").text(JSON.parse(localStorage.getItem("task14")));
  $("#row15").text(JSON.parse(localStorage.getItem("task15")));
  $("#row16").text(JSON.parse(localStorage.getItem("task16")));
  $("#row17").text(JSON.parse(localStorage.getItem("task17")));
}

recallTasks();
