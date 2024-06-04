import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ImageGenerator from './components/image-generator';

function App() {

  // const handleOnClick = async () => {
  //   const [tab] = await chrome.tabs.query({ active: true });
  //   chrome.scripting.executeScript<string[], void>({
  //     target: { tabId: tab.id! },
  //     args: [color],
  //     func: (color) => {
  //       // alert('Hellow from my vite exteions');
  //       document.body.style.backgroundColor = color;
  //     },
  //   });
  // };

  return (
    <div>
      <ImageGenerator />
    </div>
  );
}

export default App;
