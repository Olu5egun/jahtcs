// Timesheets data structure to store hours for each day
const timesheets = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: []
};

// Function to render the timesheets summary
function renderTimesheets() {
  const timesheetSummary = document.getElementById("timesheetSummary");
  timesheetSummary.innerHTML = ""; // Clear the summary container

  Object.keys(timesheets).forEach((day) => {
    const dayContainer = document.createElement("div");
    dayContainer.classList.add("timesheet-day");
    dayContainer.innerHTML = `<h2>${day}</h2>`;

    if (timesheets[day].length === 0) {
      dayContainer.innerHTML += "<p>No timesheets submitted for this day.</p>";
    } else {
      timesheets[day].forEach((entry, index) => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("timesheet-entry");
        entryDiv.innerHTML = `
          <p><strong>Worker Name:</strong> ${entry.workerName}</p>
          <p><strong>Location:</strong> ${entry.location}</p>
          <p><strong>Hours Worked:</strong> ${entry.hours}</p>
          <div class="actions">
            <button class="approve" data-day="${day}" data-index="${index}">Approve</button>
            <button class="reject" data-day="${day}" data-index="${index}">Reject</button>
          </div>
        `;
        dayContainer.appendChild(entryDiv);
      });
    }
    timesheetSummary.appendChild(dayContainer);
  });

  // Attach event listeners to approve and reject buttons
  document.querySelectorAll(".approve").forEach((button) => {
    button.addEventListener("click", approveTimesheet);
  });
  document.querySelectorAll(".reject").forEach((button) => {
    button.addEventListener("click", rejectTimesheet);
  });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const workerName = document.getElementById("workerName").value.trim();
  const location = document.getElementById("location").value.trim();
  const hoursPerDay = {
    Monday: parseFloat(document.getElementById("mondayHours").value) || 0,
    Tuesday: parseFloat(document.getElementById("tuesdayHours").value) || 0,
    Wednesday: parseFloat(document.getElementById("wednesdayHours").value) || 0,
    Thursday: parseFloat(document.getElementById("thursdayHours").value) || 0,
    Friday: parseFloat(document.getElementById("fridayHours").value) || 0,
    Saturday: parseFloat(document.getElementById("saturdayHours").value) || 0,
    Sunday: parseFloat(document.getElementById("sundayHours").value) || 0
  };

  if (!workerName || !location) {
    alert("Please fill out all required fields!");
    return;
  }

  Object.keys(hoursPerDay).forEach((day) => {
    const hours = hoursPerDay[day];
    if (hours > 0) {
      timesheets[day].push({ workerName, location, hours });
    }
  });

  // Reset the form
  document.getElementById("timesheetForm").reset();
  renderTimesheets(); // Refresh the summary
}

// Approve timesheet handler
function approveTimesheet(event) {
  const day = event.target.dataset.day;
  const index = event.target.dataset.index;
  alert(`Approved timesheet for ${timesheets[day][index].workerName}.`);
  timesheets[day].splice(index, 1); // Remove the entry
  renderTimesheets(); // Refresh the summary
}

// Reject timesheet handler
function rejectTimesheet(event) {
  const day = event.target.dataset.day;
  const index = event.target.dataset.index;
  alert(`Rejected timesheet for ${timesheets[day][index].workerName}.`);
  timesheets[day].splice(index, 1); // Remove the entry
  renderTimesheets(); // Refresh the summary
}

// Attach the form submission handler
document.getElementById("timesheetForm").addEventListener("submit", handleFormSubmit);

// Initial render
renderTimesheets();
