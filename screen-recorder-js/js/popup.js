document.addEventListener('DOMContentLoaded', () => {
  // Get the selectors of the buttons
  const startVideoBtn = document.querySelector('button#start-video');
  const stopVideoBtn = document.querySelector('button#stop-video');

  //   adding event listeners
  startVideoBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'request_recording' },
        function (response) {
          if (!chrome.runtime.lastError) {
            console.log(response);
          } else {
            console.log(chrome.runtime.lastError, 'error line 14');
          }
        }
      );
    });
  });

  stopVideoBtn.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'stop_recording' },
        function (response) {
          if (!chrome.runtime.lastError) {
            console.log(response);
          } else {
            console.log(chrome.runtime.lastError, 'error line 14');
          }
        }
      );
    });
  });
});
