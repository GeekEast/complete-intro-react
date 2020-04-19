import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import Pet from './Pet';
import SearchParams from './SearchParams';
import Details from './Details';
import { Router } from '@reach/router';
import ThemeContext from './ThemeContext';
import NavBar from './NavBar';
const App = () => {
  const theme = useState('darkblue');
  return (
    <ThemeContext.Provider value={theme}>
      <NavBar></NavBar>

      {/* <Pet name="Luna" type="Dog" breed="Havanese"/>
      <Pet name="Pepper" type="Bird" breed="Cockatiel"/>
      <Pet name="Doinl" type="Cat" breed="Mix"/> */}
      <Router>
        <SearchParams path="/"></SearchParams>
        <Details path="details/:id"></Details>
      </Router>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
