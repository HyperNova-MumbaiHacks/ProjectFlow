// popup.js

// Function to update the displayed URL in the popup
function updateUrl(url) {
  const selectedElementUrl = document.getElementById("selectedElementUrl");
  selectedElementUrl.textContent = url;
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener(function (message) {
  if (message.type === "updateUrl") {
    updateUrl(message.url);
  }
});
