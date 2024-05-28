async function sayHello() {
  let [tab] = await chrome.tabs.query({ active: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      console.log({ body: document.body });
      alert('hello from my extension 222');
    },
  });
}

document.querySelector('#myButton').addEventListener('click', sayHello);
