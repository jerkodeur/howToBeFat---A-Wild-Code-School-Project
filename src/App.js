import React from 'react';

import Header from './components/Header'
import Navbar from './components/Navbar'
import RecipeCard from './components/RecipeCard'
import RandomQuotes from './components/RandomQuotes'

import './App.css';

const App = () => {
  return (
    <div className="App">
      <div className="">
        <Header />
        <Navbar />
        <RandomQuotes />
      </div>
      <body className="body">
        <RecipeCard />
      </body>
    </div>
  );
}

export default App;
