## Complete Intro to React
### What is React?
- `React`: all about **making** and **resuing** `Components` to build large apps
- `createElement`: create an `instance` of a React Component

#### API

- react(~**12KB**): the api to create React Components.
```javascript
    const App = () => {
    	return React.createElement(
    		"div",        // html type or custom type -> web components
    		{},           // props for its children: {} [] or null is all fine
    		"Adopt Me!"   // children or content
    	)
    }
```

- react-dom(~**116KB**): the api to render React Components to HTML page, similar things are React Native, React 360(VR)...
```javascript
    ReactDOM.render(
    		React.createElement(App),              // root component instance
    		document.getElementById("root")        // entry point in html
    )
```

### Code Style
#### Prettier
- Install
```sh
yarn add --dev --exact prettier 
```
- Usage
```sh
prettier --write .
```
#### Eslint
- Install
```sh
yarn add --dev eslint 
```
- 