// Variables to store the last known raised amount and goal amount
let lastKnownRaisedAmount = 0;
let lastKnownGoalAmount = 0;

// Function to update the progress bar based on the raised and goal amounts
function updateProgressBar(raisedAmount, goalAmount) {
  const raisedAmountValue = parseFloat(raisedAmount.replace(/[^0-9.]/g, ""));
  const goalAmountValue = parseFloat(goalAmount.replace(/[^0-9.]/g, ""));

  // Calculate the width as a percentage of the goal
  const widthPercentage = (raisedAmountValue / goalAmountValue) * 100;
  const progressBar = document.querySelector(".progress-bar");

  if (widthPercentage > 100) {
    progressBar.style.width = "100%"; // Ensure it doesn't exceed 100%
    progressBar.style.backgroundColor = "green"; // Goal reached
  } else {
    progressBar.style.width = `${widthPercentage}%`;
    progressBar.style.backgroundColor = "red";
  }
}

// Function to fetch and update status
function getStatus() {
  // Make an HTTP request to the remote website to get the status.
  // This example uses the axios library for simplicity.
  axios
    .get("https://give.paws.org/team/530796")
    .then((response) => {
      const htmlContent = response.data;

      // Create a temporary element to parse the HTML
      const tempElement = document.createElement("div");
      tempElement.innerHTML = htmlContent;

      // Extract Raised and Goal amounts using jQuery
      const raisedAmount = $(".team-block_progress-raised", tempElement).text();
      const goalAmount = $(".team-block_progress-goal", tempElement).text();

      // Update your webpage with the status information
      document.getElementById("raisedAmount").textContent = raisedAmount;
      document.getElementById("goalAmount").textContent = goalAmount;
      document.getElementById("statusElement").textContent =
        "Status: Data updated";

      // Update the progress bar
      updateProgressBar(raisedAmount, goalAmount);

      // Store the last known values
      lastKnownRaisedAmount = raisedAmount;
      lastKnownGoalAmount = goalAmount;
    })
    .catch((error) => {
      console.error("Error fetching status:", error);
      // Display the last known number if an error occurs
      document.getElementById("statusElement").textContent =
        "Status: Error fetching data";
      document.getElementById("raisedAmount").textContent =
        lastKnownRaisedAmount;
      document.getElementById("goalAmount").textContent = lastKnownGoalAmount;
    });
}

// Poll for status every 5 seconds (adjust the interval as needed).
setInterval(getStatus, 5000);

// Initial status retrieval
getStatus();
