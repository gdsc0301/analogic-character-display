import { useEffect, useRef, useState } from 'react'
import './css/App.scss'
import './css/CharDisplay.scss';
import CharDisplay from './CharDisplay'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-?!. \''.split('');

function App() {
  const [mainText, setMainText] = useState('VITE + REACT!');

  const [displays, setDisplays] = useState((new Array(32)).fill(' '));

  const enoughRef = useRef(null);
  const keyboardTrigger = useRef(null);

  // Adds keydown event listener
  useEffect(() => {
    const keydown = (e) => {
      let key = e.key;

      setMainText(prev => {
        // if backspace is pressed
        if (e.key === 'Backspace') {
          return prev.slice(0, -1);
        }

        if(prev.length >= displays.length) {
          enoughRef.current.classList.add('high');
    
          const timeout = setTimeout(() => {
            enoughRef.current.classList.remove('high');
            clearTimeout(timeout);
          }, 1000);

          return prev;
        }
    
    
        key = key.toUpperCase();
        // if any letter or number or space is pressed
        if (key.match(/^[A-Z0-9?!'.+\- ]*$/) && key.length === 1) {
          return prev + key;
        }
      })
    };

    document.addEventListener('keydown', keydown);

    return () => {
      document.removeEventListener('keydown', keydown);
    };
  }, []);

  // Fills the displays array with CharDisplay components
  useEffect(() => {
    setDisplays(displays => displays.map(
      (_, index) => {
        // Align mainText to the center of the displays array
        const charIndex = index - (Math.floor(displays.length / 2) - Math.floor(mainText.length / 2));
        return mainText[index] || ' ';
      }
    ));
  }, [mainText]);

  const openKeyboard = (e) => {
    if ("virtualKeyboard" in navigator) {
      navigator.virtualKeyboard.show();
    }

    keyboardTrigger.current.focus();
  };
  
  return (
    <div>
      <span ref={keyboardTrigger} tabIndex="-1" contentEditable className='absolute top-0 left-0 w-full h-full text-[0] opacity-0 outline-none -z-10'></span>
      <h2 className='text-6xl font-black mb-12'>Type something</h2>
      <h1 className='displaysPanel'>
        {displays.map((char, i) => <CharDisplay key={`display_${i}`} char={char} />)}
        <span ref={enoughRef} className='enough' style={{display: mainText.length < displays.length && 'none'}}> enough for you...</span>
      </h1>
      <button className="openKeyboardBtn" onClick={openKeyboard}>Open Keyboard</button>
    </div>
  )
}

export default App;
export { letters };
