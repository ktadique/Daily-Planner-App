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
  drawTime();
  let currentTime = moment().format("h:mm:ss A");
  timeEl.text(currentTime);
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
  let taskInput = $("<textarea>").attr("id", "row-" + [i]);
  timeBlockRow.append(taskInput);

  //button
  let saveBtn = $("<button>").attr("id", [i]);
  saveBtn.attr("onClick", "saveTasks(this)");
  saveBtn.addClass("col-1 saveBtn");
  timeBlockRow.append(saveBtn);

  // floppy disk icon
  let floppyDisk = $("<i>").attr("class", "fa-solid fa-floppy-disk");
  saveBtn.append(floppyDisk);

  //color logic
  if (currentHour() == workHours[i]) {
    //show red
    taskInput.addClass("col-10 present");
  } else if (currentHour() < workHours[i]) {
    //show green
    taskInput.addClass("col-10 future");
  } else {
    //show gray
    taskInput.addClass("col-10 past");
  }

  // saveBtn.on("click", function (e) {
  //   let taskObject = {
  //     row0: $("#row-0").val(),
  //     row1: $("#row-1").val(),
  //     row2: $("#row-2").val(),
  //     row3: $("#row-3").val(),
  //     row4: $("#row-4").val(),
  //     row5: $("#row-5").val(),
  //     row6: $("#row-6").val(),
  //     row7: $("#row-7").val(),
  //     row8: $("#row-8").val(),
  //   };
  //   // save event to localStorage
  //   localStorage.setItem("taskObject", JSON.stringify(taskObject));
  //   console.log(e.id);
  // });
}

function saveTasks(elem) {
  let obj = "#row-" + elem.id;
  let tasks = "task" + elem.id;
  localStorage.setItem(tasks, $(obj).val());
}

// renderTimeBlocks();

/* function saveTasks() {
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
 */
