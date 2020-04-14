import React from 'react';

export const Pet = (props) =>
  React.createElement('div', {}, [
    React.createElement('h1', {}, props.name),
    React.createElement('h2', {}, props.type),
    React.createElement('h3', {}, props.breed),
  ]);
