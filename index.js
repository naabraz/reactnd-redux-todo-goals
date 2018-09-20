const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

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
    case ADD_TODO :
      return state.concat([action.todo])
    case REMOVE_TODO :
      return state.filter((todo) => todo.id !== action.id)
    case TOGGLE_TODO :
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, { complete: !todo.complete }))
    default :
      return state
  }
}

function goals (state = [], action) {
  switch(action.type) {
    case ADD_GOAL :
      return state.concat([action.goal])
    case REMOVE_GOAL :
      return state.filter((goal) => goal.id !== action.id)
    default :
      return state
  }
}

//root reducer
const app = (state = {}, action) => {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}

const store = createStore(app)

store.subscribe(() => {
  console.log('The new state is: ', store.getState())
})