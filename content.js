// content.js

// Function to log the URL of the selected image or video
function logSelectedElementUrl(selectedElement) {
    if (selectedElement.tagName === "IMG" || selectedElement.tagName === "VIDEO") {
      console.log("Selected Element URL:", selectedElement.src);
      chrome.runtime.sendMessage({ type: "updateUrl", url: selectedElement.src });
    } else {
      console.warn("Selected element is not an image or video.");
    }
  }
  
  // Event listener for mouseup events
  function handleMouseUp(event) {
    const selectedElement = document.elementFromPoint(event.clientX, event.clientY);
    logSelectedElementUrl(selectedElement);
  }
  
  // Add the event listener to the document
  document.addEventListener("mouseup", handleMouseUp);
  