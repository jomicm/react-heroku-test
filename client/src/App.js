import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [cow, setCow] = useState('');
  const [text, setText] = useState('');
  const fetchCow = async () => {
    try {
      const response = await fetch('/api/cow');
      const initialCow = await response.json();
      const cow = initialCow.moo;
      setCow(cow);
    } catch(err) {
      console.error(err);
    }
  };
  const customCow = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/cow/${text}`);
      const custom = await response.json();
      const cow = custom.moo;
      setCow(cow);
      setText('');
    } catch(err) {
      console.log(err);
    }
  };
  const handleInput = e => {
    setText(e.target.value);
  };
  useEffect(() => {
    console.log('Useee Effect@@@')
    fetchCow();
  }, []);
  return (
    <div className='App'>
      <h3>Mick's version of Cow > Moo!</h3>
      <code>{cow}</code>
      <form onSubmit={customCow}>
        <label>Custom Cow Text:</label>
        <input
          type='text'
          name='text'
          value={text}
          onChange={handleInput}
        />
        <button type="submit">Show me a talking cow!</button>
      </form>
    </div>
  )
};

export default App;