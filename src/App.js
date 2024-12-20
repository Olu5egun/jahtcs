// Simulated data storage for timesheets
const timesheets = [];

// Form and elements
const timesheetForm = document.getElementById("timesheetForm");
const workerNameInput = document.getElementById("workerName");
const hoursWorkedInput = document.getElementById("hoursWorked");
const timesheetList = document.getElementById("timesheetList");

// Function to render timesheets for the manager
function renderTimesheets() {
  timesheetList.innerHTML = ""; // Clear the list
  if (timesheets.length === 0) {
    timesheetList.innerHTML = "<p>No timesheets submitted yet.</p>";
    return;
  }

  timesheets.forEach((timesheet, index) => {
    const timesheetDiv = document.createElement("div");
    timesheetDiv.classList.add("timesheet");
    timesheetDiv.innerHTML = `
      <p><strong>Name:</strong> ${timesheet.workerName}</p>
      <p><strong>Hours Worked:</strong> ${timesheet.hoursWorked}</p>
      <button class="approve" data-index="${index}">Approve</button>
      <button class="reject" data-index="${index}">Reject</button>
    `;

    timesheetList.appendChild(timesheetDiv);
  });

  // Add event listeners for approval/rejection
  document.querySelectorAll(".approve").forEach((button) => {
    button.addEventListener("click", approveTimesheet);
  });

  document.querySelectorAll(".reject").forEach((button) => {
    button.addEventListener("click", rejectTimesheet);
  });
}

// Handle form submission (worker submits timesheet)
timesheetForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent page reload

  // Collect data
  const workerName = workerNameInput.value.trim();
  const hoursWorked = hoursWorkedInput.value.trim();

  if (workerName && hoursWorked) {
    // Add to timesheets
    timesheets.push({ workerName, hoursWorked });
    workerNameInput.value = ""; // Clear input
    hoursWorkedInput.value = "";
    renderTimesheets(); // Update manager view
  } else {
    alert("Please fill out all fields!");
  }
});

// Approve timesheet
function approveTimesheet(event) {
  const index = event.target.dataset.index;
  alert(`Timesheet approved for ${timesheets[index].workerName}!`);
  timesheets.splice(index, 1); // Remove timesheet from the list
  renderTimesheets(); // Update manager view
}

// Reject timesheet
function rejectTimesheet(event) {
  const index = event.target.dataset.index;
  alert(`Timesheet rejected for ${timesheets[index].workerName}!`);
  timesheets.splice(index, 1); // Remove timesheet from the list
  renderTimesheets(); // Update manager view
}

// Initial render
renderTimesheets();
