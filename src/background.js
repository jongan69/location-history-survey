// const fetchGoogleTimelineData = require("./fetch-google-timeline-data")

chrome.browserAction.onClicked.addListener(tab => {
  chrome.tabs.create({ url: chrome.extension.getURL('options.html') })
  tabs.create( { url: chrome.extension.getURL('foreground.html') })

})


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url.includes('http')) {
        chrome.tabs.executeScript(tabId, { file: './inject_script.js' }, function () {
            chrome.tabs.executeScript(tabId, { file: './foreground.bundle.js' }, function () {
                console.log('INJECTED AND EXECUTED');
            });
        });
    }
});




chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  fetchGoogleTimelineData(request.from, request.to)
    .then(data => {
      console.log('Received data', data)
      sendResponse({
        error: null,
        data
      })
    })
    .catch(error => {
      sendResponse({
        error
      })
    })
  // return true to indicate we wish to send a response asynchronously
  return true
})

function handleMessage(request, sender, sendResponse) {
  console.log(`content script sent a message: ${request.content}`);
  sendResponse({response: "response from background script"});
}

chrome.runtime.onMessage.addListener(handleMessage);

// (function() {
//     const tabStorage = {};
//     const networkFilters = {
//         urls: [
//             "https://www.google.com/maps/timeline"
//         ]
//     };

//     chrome.webRequest.onBeforeRequest.addListener((details) => {
//         const { tabId, requestId } = details;
//         if (!tabStorage.hasOwnProperty(tabId)) {
//             return;
//         }

//         tabStorage[tabId].requests[requestId] = {
//             requestId: requestId,
//             url: details.url,
//             startTime: details.timeStamp,
//             status: 'pending'
//         };
//         console.log(tabStorage[tabId].requests[requestId]);
//     }, networkFilters);

//     chrome.webRequest.onCompleted.addListener((details) => {
//         const { tabId, requestId } = details;
//         if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
//             return;
//         }

//         const request = tabStorage[tabId].requests[requestId];

//         Object.assign(request, {
//             endTime: details.timeStamp,
//             requestDuration: details.timeStamp - request.startTime,
//             status: 'complete'
//         });
//         console.log(tabStorage[tabId].requests[details.requestId]);
//     }, networkFilters);

//     chrome.webRequest.onErrorOccurred.addListener((details)=> {
//         const { tabId, requestId } = details;
//         if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) {
//             return;
//         }

//         const request = tabStorage[tabId].requests[requestId];
//         Object.assign(request, {
//             endTime: details.timeStamp,           
//             status: 'error',
//         });
//         console.log(tabStorage[tabId].requests[requestId]);
//     }, networkFilters);

//     chrome.tabs.onActivated.addListener((tab) => {
//         const tabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;
//         if (!tabStorage.hasOwnProperty(tabId)) {
//             tabStorage[tabId] = {
//                 id: tabId,
//                 requests: {},
//                 registerTime: new Date().getTime()
//             };
//         }
//     });
//     chrome.tabs.onRemoved.addListener((tab) => {
//         const tabId = tab.tabId;
//         if (!tabStorage.hasOwnProperty(tabId)) {
//             return;
//         }
//         tabStorage[tabId] = null;
//     });
// }());