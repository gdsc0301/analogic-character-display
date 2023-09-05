import { useEffect, useState } from 'react';
import { letters } from './App';

function CharDisplay({char}) {
    const charIndex = letters.indexOf(char);
    
    const [currCharIndex, setCurrCharIndex] = useState(0);

    // changes the targetCharIndex to the index of the current char, each 100ms
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrCharIndex(currIndex => {
                if(currIndex === charIndex){
                    clearInterval(interval);
                    return currIndex;
                }

                if(currIndex < charIndex)
                    return currIndex + 1;
                
                return currIndex - 1;
            });
        }, 40);

        return () => {
            clearInterval(interval);
        };
    }, [char]);

    return (
        <div
            className="charDisplay">
            {
            letters.map((char, index) => (
                <span
                    key={index}
                    className={`char ${char}`}
                    enabled={index <= currCharIndex ? 'true' : 'false'}
                    style={{translate: `0 0 ${index}`}}>{char}</span>
            ))}
        </div>
    );
}

export default CharDisplay;