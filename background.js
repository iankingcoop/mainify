chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(
    function logURLAttempts(info) {
      console.log("logging attempts... URL: \n", info.request.url);
      return;
      }
  );

chrome.runtime.onInstalled.addListener(() => {
    console.log("EXT installed");
    chrome.action.setBadgeText({
      text: "ON",
    });
  });


// When the user clicks on the extension action
chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    if (message === 'pageActionClicked') {
        // Do something

// chrome.action.onClicked.addListener(async (tab) => {

        // We retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({});
        // Next state will always be the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON'
    
        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            text: nextState,
        });
    
        if (nextState === "ON") {
            // Enable the redirect rule when the user turns the extension on
            chrome.declarativeNetRequest.updateEnabledRulesets({"enableRulesetIds": ["ruleset_1"]});
            console.log("redirect rule enabled");

        } else if (nextState === "OFF") {
            // Disable when the user turns the extension off
            chrome.declarativeNetRequest.updateEnabledRulesets({"disableRulesetIds": ["ruleset_1"]});
            console.log("redirect rule disabled");
        }
    }
  });