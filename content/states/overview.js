// Display overview state
const showOverviewState = (time, words, callback) => {
    // Return if main popup not exists
    if (!document.querySelector('.gpts .gpts-content')) return;

    // Create overview state DOM and put it inside the popup content
    const dom = `<div class="gpts-overview">
                    <p>
                        The content of this page is: <b>${time} min (about ${words} words)</b>.
                    </p>
                    <div class="gpts-summary-mode">
                        <p>Simplify Mode: </p>
                        <select id="gpts-summary-mode">
                            <option value="general">General</option>
                            <option value="bullet">Bullet-Points</option>
                        </select>
                    </div>
                    <div class="gpts-generate-btn">
                        Simplify
                    </div>
                    <button class="gpts-image-btn" id="gpts-image-btn">Describe Image</button>
                    <button class="gpts-video-btn" id="gpts-video-btn">Explain Video</button>
                    // <button class="gpts-ruler-btn" id="gpts-ruler-btn">Ruler</button>
                    // <button class="gpts-magnify-btn" id="gpts-magnify-btn">Magnify</button>
                </div>`;
    document.querySelector('.gpts .gpts-content').innerHTML = dom;

    // Add an event listener for click on summarize button that calls a callback function
    dynamicDomEvent('click', '.gpts-generate-btn', () => {
        const summaryMode = document.getElementById('gpts-summary-mode').value;

        callback(summaryMode);
    });

    let extensionActive = false;

    // Function to handle mouse click events
    function handleMouseClick(event) {
    if (extensionActive) {
        var selectedText = window.getSelection().toString().trim();
        if (selectedText) {
        var mediaInfo = {
            type: "text",
            content: selectedText,
        };
        chrome.runtime.sendMessage({ action: "updateMediaInfo", mediaInfo });
        } else {
        var target = event.target;
        if (target.tagName === "IMG" || target.tagName === "VIDEO") {
            var mediaInfo = {
            type: target.tagName.toLowerCase(),
            content: target.src,
            };
            console.log("Media URL:", target.src);

            const wrapperApiUrl = 'http://127.0.0.1:8000/image/';

            const imageUrl = target.src;

            // Define the payload using the Image class schema
            const payload = {
                image_url: imageUrl
            };

            // Make the POST request
            fetch(wrapperApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then(response => response.json())
            .then(data => {
                // Handle the response
                console.log(data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });

        }
        }
    }
    }

    // Event listener for messages from the background script
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === "getMediaInfo") {
            sendResponse({ message: "Ready to capture media URL." });
        } else if (request.action === "toggleExtension") {
            // Toggle the extension's state
            extensionActive = !extensionActive;
            sendResponse({ active: extensionActive });
        }
    });

    // Event listener for mouse clicks
    document.addEventListener("mousedown", handleMouseClick);

    // Add event listeners for click on API call buttons
    dynamicDomEvent('click', 'gpts-image-btn', () => {
        //write code to output url of image after clicking on the image
        //img_src = image source
        // makeApiCall1(img_src);

        chrome.runtime.sendMessage({ action: "toggleExtension" }, (response) => {
            console.log("Extension is now", response.active ? "active" : "inactive");
        });


    });

    dynamicDomEvent('click', 'gpts-video-btn', () => {
        makeApiCall2();
    });

    // Add event listener for click on Ruler button
    dynamicDomEvent('click', 'gpts-ruler-btn', () => {
        createRuler();
    });

}


// Function to create and move the ruler
const createRuler = () => {
    // Create a ruler element
    const ruler = document.createElement('div');
    ruler.className = 'gpts-ruler';
    document.body.appendChild(ruler);

    // Add styles to the ruler
    ruler.style.position = 'absolute';
    ruler.style.height = '50px';
    ruler.style.width = '100%';
    ruler.style.background = 'rgba(0, 0, 0, 0.5)';
    ruler.style.pointerEvents = 'none';

    // Add event listener for mousemove to move the ruler
    const handleMouseMove = (event) => {
        ruler.style.top = `${event.clientY}px`;
    };

    // Add event listener for mouseup to remove the ruler and event listeners
    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        ruler.remove();
    };

    // Add event listeners for mousemove and mouseup
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
};

// Get page content instance with Readability package
const getPageContent = () => {
    const documentClone = document.cloneNode(true);
    const article = new Readability(documentClone).parse();

    return article;
}

// Function to make API call 1
const makeApiCall1 = () => {
    // Make your API call 1 using fetch and POST method
    fetch('your_api_endpoint_1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers as needed
        },
        body: JSON.stringify({
            // Add your request payload for API call 1
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the API response for call 1
        console.log('API Call 1 response:', data);
    })
    .catch(error => {
        console.error('Error making API call 1:', error);
    });
}

// Function to make API call 2
const makeApiCall2 = () => {
    // Make your API call 2 using fetch and POST method
    fetch('your_api_endpoint_2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any additional headers as needed
        },
        body: JSON.stringify({
            // Add your request payload for API call 2
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the API response for call 2
        console.log('API Call 2 response:', data);
    })
    .catch(error => {
        console.error('Error making API call 2:', error);
    });
}

// Add event listener for click on Magnify button
dynamicDomEvent('click', 'gpts-magnify-btn', () => {
    startMagnification();
});

// Function to start magnification
const startMagnification = () => {
    // Create a magnifier element
    const magnifier = document.createElement('div');
    magnifier.className = 'gpts-magnifier';
    document.body.appendChild(magnifier);

    // Add styles to the magnifier
    magnifier.style.position = 'absolute';
    magnifier.style.width = '75px'; // You can adjust the size as needed
    magnifier.style.height = '100px'; // You can adjust the size as needed
    magnifier.style.border = '2px solid #000';
    magnifier.style.borderRadius = '5px';
    magnifier.style.pointerEvents = 'none';

    // Add event listener for mousemove to move the magnifier
    const handleMouseMove = (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        magnifier.style.left = `${mouseX}px`;
        magnifier.style.top = `${mouseY}px`;

        // Magnify the content underneath the magnifier
        magnifyContent(mouseX, mouseY);
    };

    // Add event listener for mouseup to remove the magnifier and event listeners
    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        magnifier.remove();
    };

    // Add event listeners for mousemove and mouseup
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
};

// Function to magnify content
const magnifyContent = (mouseX, mouseY) => {
    // Get the content under the magnifier using elementFromPoint
    const magnifiedContent = document.elementFromPoint(mouseX, mouseY);

    // Check if content is available
    if (magnifiedContent) {
        // Apply magnification effect to the content (you can adjust the scale factor as needed)
        magnifiedContent.style.transform = 'scale(1.5)';
    }
};
