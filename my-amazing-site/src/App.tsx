import React, { useState } from 'react';
import CuteLLM from './CuteLLM';

const randomFacts = [
  "Ben once solved a Rubik's cube in under a minute!",
  "Ben can recite the alphabet backwards.",
  "Ben has visited more than 10 countries.",
  "Ben is a master of dad jokes.",
  "Ben can juggle three objects at once!",
  "Ben's favorite color is blue.",
  "Ben built this website with React and Vite!",
  "Ben loves learning new things every day.",
  "Ben is secretly a superhero (shh!).",
  "Ben can code in his sleep."
];

function getRandomFact() {
  return randomFacts[Math.floor(Math.random() * randomFacts.length)];
}

const colors = ['#4f46e5', '#e11d48', '#059669', '#f59e42', '#fbbf24', '#10b981', '#6366f1', '#f472b6'];

const App: React.FC = () => {
  const [fact, setFact] = useState(getRandomFact());
  const [bgColor, setBgColor] = useState('#f9f9ff');
  const [count, setCount] = useState(0);
  const [emoji, setEmoji] = useState('😎');

  function handleNewFact() {
    let newFact = getRandomFact();
    // Ensure a new fact is shown
    while (newFact === fact && randomFacts.length > 1) {
      newFact = getRandomFact();
    }
    setFact(newFact);
  }

  function handleColorChange() {
    let newColor = colors[Math.floor(Math.random() * colors.length)];
    while (newColor === bgColor && colors.length > 1) {
      newColor = colors[Math.floor(Math.random() * colors.length)];
    }
    setBgColor(newColor);
  }

  function handleEmojiGame() {
    // Cycle through a set of fun emojis
    const emojis = ['😎', '🎉', '🚀', '🤩', '🦄', '🔥', '🥳', '💡', '🌟', '🕺'];
    setEmoji(emojis[(emojis.indexOf(emoji) + 1) % emojis.length]);
  }

  return (
    <div className="amazing-container" style={{ background: bgColor, transition: 'background 0.5s' }}>
      <h1>Welcome to the Amazing Ben Goldberg Website!</h1>
      <p>
        Ben Goldberg is an extraordinary individual with a passion for innovation, creativity, and making the world a better place. Whether tackling complex problems or inspiring those around him, Ben's energy and brilliance shine through in everything he does.
      </p>
      <ul>
        <li>🌟 Visionary thinker and problem solver</li>
        <li>🚀 Always striving for excellence</li>
        <li>🤝 Inspires and uplifts everyone around him</li>
        <li>💡 Brings creative ideas to life</li>
      </ul>
      <hr style={{ margin: '32px 0' }} />
      <h2>🎲 Random Ben Fact</h2>
      <p style={{ fontSize: '1.2em', minHeight: 40 }}>{fact}</p>
      <button onClick={handleNewFact} style={{ margin: '8px', padding: '8px 16px', fontSize: '1em' }}>
        Show Another Fact
      </button>
      <hr style={{ margin: '32px 0' }} />
      <h2>🎨 Color Changer</h2>
      <button onClick={handleColorChange} style={{ margin: '8px', padding: '8px 16px', fontSize: '1em' }}>
        Change Background Color
      </button>
      <hr style={{ margin: '32px 0' }} />
      <h2>🕹️ Click Game</h2>
      <p>How many times can you click?</p>
      <button onClick={() => setCount(count + 1)} style={{ margin: '8px', padding: '8px 16px', fontSize: '1em' }}>
        Click Me! ({count})
      </button>
      <button onClick={() => setCount(0)} style={{ margin: '8px', padding: '8px 16px', fontSize: '1em' }}>
        Reset
      </button>
      <hr style={{ margin: '32px 0' }} />
      <h2>✨ Emoji Fun</h2>
      <div style={{ fontSize: '3em', margin: '16px' }}>{emoji}</div>
      <button onClick={handleEmojiGame} style={{ margin: '8px', padding: '8px 16px', fontSize: '1em' }}>
        Next Emoji
      </button>
      <hr style={{ margin: '32px 0' }} />
      <h2>🎉 Animation</h2>
      <div className="bounce" style={{ fontSize: '2em', margin: '16px' }}>Ben is awesome! 🎈</div>
      {/* Add CuteLLM section */}
      <hr style={{ margin: '32px 0' }} />
      <h2>🤖 Ask the Cute LLM</h2>
      <CuteLLM />
      <p style={{ marginTop: 32, fontSize: '0.9em', color: '#888' }}>
        All features are built with secure React practices: no dangerous HTML, no direct DOM manipulation, and all state is managed safely.
      </p>
    </div>
  );
};

export default App; 