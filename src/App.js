const Pet = (props) =>
  React.createElement('div', {}, [
    React.createElement('h1', {}, props.name), // name
    React.createElement('h2', {}, props.type), // type
    React.createElement('h3', {}, props.breed), // breed
  ]);

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
