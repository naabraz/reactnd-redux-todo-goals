const ADD_TODO = 'ADD_TODO'

//Library code
function createStore (reducer) {
  // The store should have four parts
  // 1. The state
  // 2. Get the state.
  // 3. Listen to changes on the state.
  // 4. Update the state

  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)

    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  //state will be whatever reducer (todos) function returns
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener()) //calls the function passed to subscribe function
  }

  return {
    getState,
    subscribe,
    dispatch,
  }
}

//App code
//this is a reducer and must be a pure function
function todos (state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo])
    default:
      return state
  }
}

const store = createStore(todos)