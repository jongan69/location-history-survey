function handleResponse(message) {
    console.log(`background script sent a response: ${message.response}`);
  }
  
  function handleError(error) {
    console.log(`Error: ${error}`);
  }
  
  function sendMessage(e) {
    const sending = browser.runtime.sendMessage({content: "message from the content script"});
    sending.then(handleResponse, handleError);
  }
  
  window.addEventListener("click", sendMessage);