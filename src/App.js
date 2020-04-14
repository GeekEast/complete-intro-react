import React from 'react';
import ReactDOM from 'react-dom';
import { Pet } from './Pet';

const App = () =>
  React.createElement('div', {}, [
    React.createElement('h1', {}, 'Adopt Me!'),
    React.createElement(Pet, { name: 'Luna', type: 'Dog', breed: 'Havanese' }),
    React.createElement(Pet, {
      name: 'Pepper',
      type: 'Bird',
      breed: 'Cockatiel',
    }),
    React.createElement(Pet, { name: 'Doink', type: 'Cat', breed: 'Mix' }),
  ]);

ReactDOM.render(React.createElement(App), document.getElementById('root'));
