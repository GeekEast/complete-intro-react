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

### Class Components
- `this.func.bind` **used** to be an **expensive** operation in **browser**
- Although chrome fix the **performance** issue of `bind`, but you still need to try to avoid using `bind` since application may run in old browser
#### setState
- shallow merge
```javascript
this.state = {a: 1, b:2}
this.setState({
  a:2, // override 1
  b:3, // override 2
  c:4  // add new
})
```

#### `getDerivedStateFromProps()`
- Happens before `render()`
- usually used to compare `previous state` and `current props from parents` to determine **data** for `rendering`
- **not recommended** to use by React
##### Alternatives
- Fully **Controlled** Component
```javascript
function EmailInput(props) {
  return <input onChange={props.onChange} value={props.email} />;
}
```
- **Best way**: Fully **uncontrolled** component with a `key` 
  
> When a key changes, React will create a `new component instance` rather than **update** the existing one.

```javascript
class EmailInput extends Component {
  state = { email: this.props.defaultEmail };

  handleChange = event => {
    this.setState({ email: event.target.value });
  };

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }
}

<EmailInput
  defaultEmail={this.props.user.email}
  key={this.props.user.id}
/>
```

### Error Boundaries
- EB is just like `Exception Handling` to catch some errors to **avoid** crashing your applications.
> An `Error Boundary Component` must be a **Class Component**

- EB can only catch erros of its children components
- EB cannot be used in event handlers
- You can use `try/catch` in event handlers
#### Usage
- Simply use `either` methods within a **class component**, then the component becomes an `Error Boundary`
  - `static getDerivedStateFromError()`: control to display fallback UI
  - `componentDidCatch()`: side effect like error logging service
#### static getDerivedStateFromError()
> happens during render(), thus not allowed for handling any side effects

#### componentDidCatch()
- used for hadning **side effects** like `error logging service`
  - [Azure Monitor](https://azure.microsoft.com/en-us/services/monitor/?WT.mc_id=reactintro-github-brholt)
  - [Sentry](https://sentry.io/)
  - [TrackJS](https://trackjs.com/)

```javascript
// ErrorBoundary.js
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // step 1: intilaize error state
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    // step 2: change error state when error happens
    return { hasError: true };
  }

  // step 3: side effect like error logging service
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  // step 4: fallback UI
  render() {
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page or wait five seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```
#### Test
```javacript
  componentDidMount() {
    throw new Error("lol"); 
    ...
  }
```

### Context
- Application-Level State, **avoid using context until you have to use it**.
- Use `Redux` or `Context`, don't use them both.
- Context is useful to pass `broadcasting` **user-data**


### Context
- Application-Level State, **avoid using context until you have to use it**.
- Use `Redux` or `Context`, don't use them both.
- Context is useful to pass `broadcasting` **user-data**

### Portal
- usually used to do modal
#### Create A new Mount Point
- This where the modal will actually be mounted whenever we render to this portal. **Totally separate from our app root**.
```html
<body>
  <div id="root">Not Rendered!</div>
  <!-- Second Mount Point -->
  <div id="modal"></div> 
</body>
```

#### Create a Modal Container
```javascript
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
```

#### Apply Modal
```javascript
  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }
  adopt() {
    navigate(this.state.url);
  }

  {showModal ? (
    <Modal>
      <div>
        <h1>Would you like to adopt {name}?</h1>
        <div className="buttons">
          <button onClick={this.adopt}>Yes</button>
          <button onClick={this.toggleModal}>No</button>
        </div>
      </div>
    </Modal>
  ) : null}
```

### Hooks in Depth
- [GitHub Repo](https://github.com/GeekEast/react-hooks-examples)
- [Code Sandbox](https://codesandbox.io/s/github/GeekEast/react-hooks-examples)

### Emotion
- One **small** and **fast** solution for `styled-component`
  
```javascript
import { css } from '@emotion/core';
<header
  css={css`
    background-color: #333;
    position: sticky;
    top: 0;
    z-index: 10;
  `}
>
</header>
```

### Code Spliting with lazy and Suspense
- You only need to use `Suspense` **once** on top of the App
#### On Router
```javascript
const Details = lazy(() => import('./Details'));
const SearchParams = lazy(() => import('./SearchParams'));

<Suspense fallback={<h1>loading routes ...</h1>}>
  <Router>
    <SearchParams path="/"></SearchParams>
    <Details path="details/:id"></Details>
  </Router>
</Suspense>
```
#### On anywhere else
```javascript
// Details
const Modal = lazy(() => import("./Modal"))
```
### Code spliting with loadable
- Don't need `suspense` anymore
- You can easiy specify corresponding `fallback` for each Loadable component
- More `readable`
```javascript
const Details = Loadable({
  loader: () => import('./Details'),
  loading: () => <div>Loading</div> 
})

const SearchParams = Loadable({
  loader: () => import('./SearchParams'),
  loading: () => <div>Loading</div>
})

const Modal = Loadable({
  loader: () => import("./Modal"),
  loading: () => <div>Loading</div>
})

```

### Server Side Rendering
- **Without** `SSR`, user has to download html(nothing, just mount point),js, wait for js to run and then see the page. **Slow!**
- **With** `SSR`, use just download the html and page shows immediately. **Fast!**
- `SSR` is typically used to `render` the page **for the first time**.
- `SSR` is also beneficial to `Search Engine Optimization`(SEO)

#### Process
- React `pre-render` the page in the backend
- Backend server sends only `markup` for user **first time** access
- Frontend: React is still rendering, once it finshed, it will **replace the first time page**.

#### Important!
- You have to go through your **entire application** to make sure **for the first time render**, there is no reference to `document` object.
- Since in `Node.js`, there is no `documents` object
- Solution: put `document` object inside `useEffect()`, rather than outside `component`
```javascript
// const modalRoot = document.getElementById("modal") 
const Modal = () => {
  useEffect(
    const modalRoot = document.getElementById("modal") 
  )
}
```
