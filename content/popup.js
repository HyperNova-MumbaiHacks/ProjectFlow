// Create a main popup element with icon, header, content, and footer
const createMainPopup = () => {
    // Create a div element with class name 'gpts'
    const popupDom = document.createElement('div');
    popupDom.classList.add('gpts');

    // Get the URL of icon image from extension assets
    const icon = chrome.runtime.getURL("assets/icons/icon-128.png");

    // Sets the innerHTML of the popupDom element
    popupDom.innerHTML = `<div class="gpts-head">
                                <div class="gpts-ext-logo">
                                    <img src="${icon}" width="25" alt="GPT Summarizer">

                                    <b class="gpts-ext-name">Project Flow</b>
                                </div>

                                <div class="gpts-close">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M25 7L7 25" stroke="black" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M25 25L7 7" stroke="black" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                    </svg>
                                </div>
                            </div>
                            <div class="gpts-content"></div>

                            <div class="gpts-footer"></div>`;
    document.body.appendChild(popupDom);

    // Create a overlay div element and append to body
    const overlayDom = document.createElement('div');
    overlayDom.classList.add('gpts-overlay');
    document.body.appendChild(overlayDom);

    // Handle the close popup action when click on "X" icon
    dynamicDomEvent('click', '.gpts-close', () => {
        displayMainPopup(false);
    });

    // Handle the close popup action when click on overlay element
    dynamicDomEvent('click', '.gpts-overlay', () => {
        displayMainPopup(false);
    });
}

// Toggle display main popup with overlay
const displayMainPopup = (show = true) => {
    const popup = document.querySelector('.gpts');
    const overlay = document.querySelector('.gpts-overlay');

    if (show) {
        if (popup.classList.contains('gpts-hidden')) popup.classList.remove('gpts-hidden');
        if (overlay.classList.contains('gpts-hidden')) overlay.classList.remove('gpts-hidden');
    } else {
        if (!popup.classList.contains('gpts-hidden')) popup.classList.add('gpts-hidden');
        if (!overlay.classList.contains('gpts-hidden')) overlay.classList.add('gpts-hidden');
    }
}