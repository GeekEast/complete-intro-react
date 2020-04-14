const Pet = () =>
  React.createElement("div", {}, [
    React.createElement("h1", {}, "Luna"), // name
    React.createElement("h2", {}, "Dog"),  // type
    React.createElement("h3", {}, "Havanese"), // breed
  ]);


const App = () =>
  React.createElement("div", {}, [
    React.createElement("h1", {}, "Adopt Me!"),
    React.createElement(Pet),
    React.createElement(Pet),
    React.createElement(Pet),
  ]);


ReactDOM.render(React.createElement(App), document.getElementById("root"));
