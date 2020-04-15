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
    {}, // props for its children: {} [] or null is all fine
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