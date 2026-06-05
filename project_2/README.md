# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# Password Generator - React Learning Project

## Project Goal

This project was built to understand React fundamentals through a real-world application.

The application generates random passwords based on user-selected options such as:

* Password Length
* Include Numbers
* Include Special Characters
* Copy Password to Clipboard

---

## React Concepts Learned

### 1. useState

Used for storing and updating data that changes in the UI.

```jsx
const [length, setLength] = useState(8)
const [numberAllowed, setnumberAllowed] = useState(false)
const [charAllowed, setcharAllowed] = useState(false)
const [Password, setPassword] = useState("")
```

#### Why useState?

Whenever the user:

* changes password length
* enables/disables numbers
* enables/disables special characters

React updates the state and re-renders the component.

---

### 2. useEffect

```jsx
useEffect(() => {
  PasswordGenerator()
}, [length, numberAllowed, charAllowed, PasswordGenerator])
```

#### Purpose

Automatically generates a new password whenever:

* length changes
* numbers option changes
* special character option changes

Think of useEffect as a watcher.

Whenever its dependencies change, React executes the effect.

---

### 3. useCallback

```jsx
const PasswordGenerator = useCallback(() => {
  ...
}, [length, numberAllowed, charAllowed])
```

#### Purpose

Memoizes the PasswordGenerator function.

Without useCallback:

* a new PasswordGenerator function would be created on every render

With useCallback:

* React reuses the same function
* only recreates it when dependencies change

This improves performance and prevents unnecessary effect executions.

---

### 4. useRef

```jsx
const passwordref = useRef(null)
```

Attached to:

```jsx
<input ref={passwordref} />
```

#### Purpose

Provides direct access to the input element.

Used for:

```jsx
passwordref.current.select()
```

which selects the generated password before copying.

---

## Password Generation Logic

### Character Pool

Initially:

```js
ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
```

If special characters are enabled:

```js
!@#$%^&*()_+
```

are added.

If numbers are enabled:

```js
0123456789
```

are added.

Final character pool depends on user selections.

---

### Random Character Selection

```js
Math.floor(Math.random() * str.length)
```

Generates a random index.

Then:

```js
str.charAt(index)
```

selects a random character.

The process repeats until the desired password length is reached.

---

## Copy to Clipboard Feature

```jsx
navigator.clipboard.writeText(Password)
```

Copies the generated password into the user's clipboard.

Flow:

1. Select password text
2. Copy password
3. User can paste anywhere

---

## React Rendering Flow

User changes slider

↓

setLength()

↓

State Updates

↓

Component Re-renders

↓

useEffect Detects Change

↓

PasswordGenerator Runs

↓

setPassword()

↓

UI Updates

---

## Important Bug Learned

### Infinite Render Loop

Wrong:

```jsx
const PasswordGenerator = useCallback(() => {
 ...
}, [length, numberAllowed, charAllowed, Password])
```

Problem:

Password changes

↓

PasswordGenerator changes

↓

useEffect runs

↓

setPassword()

↓

Password changes again

↓

Infinite Loop

Result:

```txt
Maximum update depth exceeded
```

Solution:

```jsx
[length, numberAllowed, charAllowed]
```

Password should not be included in the dependency array.

---

## Skills Practiced

* React Hooks
* State Management
* Side Effects
* Function Memoization
* DOM References
* Event Handling
* Clipboard API
* Random Password Algorithm
* Component Re-rendering
* Dependency Arrays

---

## Key Learning

React applications work through a cycle:

State Change

↓

Re-render

↓

Effects Execute

↓

UI Updates

Understanding this flow is more important than memorizing syntax.
