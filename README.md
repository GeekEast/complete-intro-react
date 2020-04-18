## Complete Intro to React

### What is React?

- `React`: all about **making** and **resuing** `Components` to build large apps
- `createElement`: create an `instance` of a React Component

#### API

- react(~**12KB**): the api to create React Components.

```javascript
const App = () => {
  return React.createElement(
    'div', // html type or custom type -> web components
    {}, // props for it and its children: {} [] or null is all fine
    'Adopt Me!' // children or content
  );
};
```

- react-dom(~**116KB**): the api to render React Components to HTML page, similar things are React Native, React 360(VR)...

```javascript
ReactDOM.render(
  React.createElement(App), // root component instance
  document.getElementById('root') // entry point in html
);
```

### Code Style

#### Prettier

- Install
```sh
yarn add --dev --exact prettier
```
- Config
```json
# package.json
  "scripts": {
+   "format": "prettier --write \"src/**/*.{js,jsx}\"",
    "test": "echo \"Error: no test specified\" && exit 1",
  },
```


```json
// .prettierrc
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```
```sh
# .prettierignore
dist/
**/*.md
.cache/
coverage/
```

#### Eslint

- Install
```sh
yarn add --dev eslint eslint-config-prettier
```
- Config
```json
# package.json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "format": "prettier --write \"src/**/*.{js,jsx}\"",
+   "lint": "eslint \"src/**/*.{js,jsx,html,css}\" --fix --quiet"
  },
```
```json
// eslintrc.json
{
  "extends": ["eslint:recommended", "prettier", "prettier/react"],
  "plugins": [],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  }
}
```

### Bundler
- Install
```sh
yarn add --dev parcel-bundler 
```
- Config
```json
  "scripts": {
+   "dev": "parcel src/index.html",
+   "build": "parcel build src/index.html",
    "test": "echo \"Error: no test specified\" && exit 1",
    "format": "prettier --write \"src/**/*.{js,jsx}\"",
    "lint": "eslint \"src/**/*.{js,jsx,html,css}\" --fix --quiet"
  },
```
- Run Production locally
```
yarn global add serve
serve -s dist
```
> Parcel will automatically install package that has been imported in your code.

### JSX
- Make code more **readable**
- translate `HTML` tags into `React.createElement` calls
#### Example
- You still need to import `React` to use `React.createElement()` **behind the hood**.
- **Before**
```javascript
React.createElement("h1", {id:"main-title"}, props.name)
```
- **After**
```html
<h1 id="main-title">{props.name}</h1>
```
#### Add JSX support for Eslint
- Install
```sh
yarn add --dev babel-eslint eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```
- Config
```json
{
  "extends": [
    "eslint:recommended",
+   "plugin:import/errors",
+   "plugin: react/recommended",
+   "plugin: jsx-a11y/recommended",
    "prettier", 
    "prettier/react"],
  "rules": {
+   "react/prop-types": 0,
+   "react/display-name": 0
  }
  "plugins": [
+   "react",
+   "import",
+   "jsx-a11y"
  ],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
+  "settings": {
+    "react": {
+      "version": "detect"
+    }
+  }
}

```

### Hooks
#### Two rules of using Hooks
- **initialize** hooks only on the top, don't use them in loops, conditions or nested functions
```javascript
const App = () => {
  const [number, setNumber] = useState(0)
  ...
}
```
- **use** hooks in React Functions: React Component or Other Hooks
> [Hooks Rules](https://zh-hans.reactjs.org/docs/hooks-rules.html)

#### Eslint for Hooks
- Install `yarn add -D eslint-plugin-react-hooks`
- Config:
```json
{
  "rules": {
    …,
    "react-hooks/rules-of-hooks": "error"
  },
  "plugins": [
    …,
    "react-hooks"
    ],
}
```

#### Code Reuse with Hooks
- Further **Decoupled** Code between `parent` and `children` components
```javascript
const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState); // state manager
  const Dropdown = () => (
    //...
  ); // component
  return [state, Dropdown, setState] // expose component with state manager
};
```

### Effects
- Typically used to fetech data from API

### Dev Tools
#### Development vs Production Mode
- Production mode has much `smaller` size of the bundled javascript
- if you use `Parcel.js`, you can do this to change mode
```sh
NODE_ENV=development
```

#### Strict Mode
- give your additional warnings about things that you shouldn't do.
```javascript
const App = () => {
  return <React.StrictMode>
  // ...
  </React.StrictMode>
}

```
#### Dev Tools
- react dev tools in chrome
- redux dev tools in chrome
- reselect dev tools in chrome

### Reach Router
- Good for handling accessibility