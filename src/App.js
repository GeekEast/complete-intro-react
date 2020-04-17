import React from 'react';
import ReactDOM from 'react-dom';
// import Pet from './Pet';
import SearchParams from './SearchParams';

const App = () => {
  return (
    <div>
      <h1>Adopt Me!</h1>
      {/* <Pet name="Luna" type="Dog" breed="Havanese"/>
      <Pet name="Pepper" type="Bird" breed="Cockatiel"/>
      <Pet name="Doinl" type="Cat" breed="Mix"/> */}
      <SearchParams></SearchParams>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'));
