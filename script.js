// Wait for the DOM to be ready
$(document).ready(function () {
  const iframe = document.getElementById("externalFrame");

  iframe.addEventListener("load", function () {
    // Access the content of the iframe
    const iframeContent = iframe.contentWindow.document;

    // Extract the data from the span elements within the iframe
    const raisedAmountElement = iframeContent.querySelector(
      ".team-block_progress-raised"
    );
    const goalAmountElement = iframeContent.querySelector(
      ".team-block_progress-goal"
    );

    if (raisedAmountElement && goalAmountElement) {
      const raisedAmount = raisedAmountElement.textContent.trim();
      const goalAmount = goalAmountElement.textContent.trim();

      // Update the content on your webpage
      document.getElementById(
        "raisedAmount"
      ).textContent = `Raised: ${raisedAmount}`;
      document.getElementById("goalAmount").textContent = `Goal: ${goalAmount}`;
      document.getElementById("statusElement").textContent =
        "Status: Data updated";

      // Update the progress bar (if needed)
      updateProgressBar(raisedAmount, goalAmount);
    } else {
      console.log("Data not found");
    }
  });
});
// Function to update the progress bar based on the raised and goal amounts
function updateProgressBar(raisedAmount, goalAmount) {
  // Convert raisedAmount and goalAmount to numbers
  const raisedAmountValue = parseFloat(raisedAmount.replace(/[^0-9.]/g, ""));
  const goalAmountValue = parseFloat(goalAmount.replace(/[^0-9.]/g, ""));

  // Calculate the width as a percentage of the goal
  const widthPercentage = (raisedAmountValue / goalAmountValue) * 100;
  const progressBar = document.querySelector(".progress-bar");

  // Limit the widthPercentage to a maximum of 100%
  const limitedWidthPercentage = Math.min(widthPercentage, 100);

  // Set the width of the progress bar
  progressBar.style.width = `${limitedWidthPercentage}%`;

  // Change the color to green when the goal is reached
  if (limitedWidthPercentage >= 100) {
    progressBar.style.backgroundColor = "green";
  } else {
    progressBar.style.backgroundColor = "red";
  }
}
