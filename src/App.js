import React from 'react';
import ReactDOM from 'react-dom';
// import Pet from './Pet';
import SearchParams from './SearchParams';
import Details from './Details';
import { Router, Link } from '@reach/router'

const App = () => {
  return (
    <div>

      <header>
        <Link to="/">
          Adopt Me!
        </Link>
      </header>

      {/* <Pet name="Luna" type="Dog" breed="Havanese"/>
      <Pet name="Pepper" type="Bird" breed="Cockatiel"/>
      <Pet name="Doinl" type="Cat" breed="Mix"/> */}
      <Router>
        <SearchParams path="/"></SearchParams>
        <Details path="details"></Details>
      </Router>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));
