import React, { useState, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import ThemeContext from './ThemeContext';
import NavBar from './NavBar';

const Details = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

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

ReactDOM.render(<App />, document.getElementById('root'));
