import React, { useState, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import ThemeContext from './ThemeContext';
import NavBar from './NavBar';
import Loadable from 'react-loadable';

const Details = Loadable({
  loader: () => import('./Details'),
  loading: () => <div>Loading</div> 
})

const SearchParams = Loadable({
  loader: () => import('./SearchParams'),
  loading: () => <div>Loading</div>
})

const App = () => {
  const theme = useState('darkblue');
  return (
    <ThemeContext.Provider value={theme}>
      <NavBar></NavBar>
      <Suspense fallback={<h1>loading routes ...</h1>}>
        <Router>
          <SearchParams path="/"></SearchParams>
          <Details path="details/:id"></Details>
        </Router>
      </Suspense>
    </ThemeContext.Provider>
  );
};

// remove react-dom import
// replace render at bottom
export default App;