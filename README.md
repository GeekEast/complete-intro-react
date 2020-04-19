<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table Of Content

- [Complete Intro to React](#complete-intro-to-react)
  - [What is React?](#what-is-react)
    - [API](#api)
  - [JSX](#jsx)
    - [Example](#example)
  - [Hooks](#hooks)
    - [Two rules of using Hooks](#two-rules-of-using-hooks)
    - [Code Reuse with Hooks](#code-reuse-with-hooks)
  - [Dev Tools](#dev-tools)
    - [Development vs Production Mode](#development-vs-production-mode)
    - [Strict Mode](#strict-mode)
  - [Reach Router](#reach-router)
  - [Class Components](#class-components)
    - [setState](#setstate)
    - [`getDerivedStateFromProps()`](#getderivedstatefromprops)
    - [Alternatives to `getDerivedStateFromProps()`](#alternatives-to-getderivedstatefromprops)
  - [Error Boundaries](#error-boundaries)
    - [Usage](#usage)
    - [static getDerivedStateFromError()](#static-getderivedstatefromerror)
    - [componentDidCatch()](#componentdidcatch)
    - [Test Error](#test-error)
  - [Context](#context)
  - [Portal](#portal)
    - [Create A new Mount Point](#create-a-new-mount-point)
    - [Create a Modal Container](#create-a-modal-container)
    - [Apply Modal](#apply-modal)
  - [Styled Component: Emotion](#styled-component-emotion)
  - [Code Spliting with `lazy` and `Suspense`](#code-spliting-with-lazy-and-suspense)
    - [On Router](#on-router)
    - [On anywhere else](#on-anywhere-else)
  - [Code spliting with `loadable`](#code-spliting-with-loadable)
  - [Server Side Rendering](#server-side-rendering)
    - [Process](#process)
  - [Testing](#testing)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
#### Alternatives to `getDerivedStateFromProps()`
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
#### Test Error
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

### Styled Component: Emotion
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

### Code Spliting with `lazy` and `Suspense`
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
### Code spliting with `loadable`
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
*   **Without** `SSR`, user has to download html(nothing, just mount point),js, wait for js to run and then see the page. **Slow!**
*   **With** `SSR`, use just download the html and page shows immediately. **Fast!**
*   `SSR` is typically used to `render` the page **for the first time**.
*   `SSR` is also beneficial to `Search Engine Optimization`(SEO)

#### Process

*   React `pre-render` the page in the backend
*   Backend server sends only `markup` for user **first time** access
*   Frontend: React is still rendering, once it finshed, it will **replace the first time page**.

### Testing

*   `Jest` can be used both for React and Node.js
*   `@testing-library/react` is a new recommended and easy way to test React (replacing Enzyme)
*   `__tests__` naming are borrowed from python means something magic. (jest will **automatically** find `__tests__` and run it.)
    *   You can name `SearchParams.js` rather thatn `SearchParams.test.js`, magic folder names help jest find it.
    *   Without magic folder name, you need assign `SearchParams.test.js` to let testing libs find testing scripts.
*   If one test including `3rd party API` and `don't want to wait for API response`, we can use **mock** to replace it.