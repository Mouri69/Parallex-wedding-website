import React from 'react';
import Hero from './components/Hero';
import Details from './components/Details';
import RSVP from './components/RSVP';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <Hero />
      <Details />
      <RSVP />
    </div>
  );
}

export default App;
