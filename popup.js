console.log("starting popup.jss");

document.addEventListener('DOMContentLoaded', function list_furda_dcoms () {
    // Do something, e.g. send a message to content or background script
    console.log("even dcom stuff loaded found");
    chrome.runtime.sendMessage('pageActionClicked');
});

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(
  function logURLAttempts(info) {
    console.log("Redirect rule matched. Initial URL: \n", info.request.url);
    return;
    }
);