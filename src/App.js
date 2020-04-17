import React from 'react';

import Header from './components/Header'
import Navbar from './components/Navbar'
import RecipeCard from './components/RecipeCard'

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <RecipeCard />
    </div>
  );
}

export default App;
