// 
export interface TodoItemDataParams {
  id: number
  text: string
  done: boolean
}

export interface TodoState {
  todoItems: TodoItemDataParams[]
  input: string
}

// action types
// export const actionTypes = {
//   CREATE: 'todo/CREATE',
//   REMOVE: 'todo/REMOVE',
//   TOGGLE: 'todo/TOGGLE',
//   CHANGE_INPUT: 'todo/CHANGE_INPUT',
// }
export const CREATE = "todo/CREATE";
export const REMOVE = "todo/REMOVE";
export const TOGGLE = "todo/TOGGLE";
export const CHANGE_INPUT = "todo/CHANGE_INPUT";

interface CreateAction {
  type: typeof CREATE
  payload: TodoItemDataParams
}

interface RemoveAction {
  type: typeof REMOVE
  meta: { id: number }
}

interface ToggleAction {
  type: typeof TOGGLE
  meta: { id: number }
}

interface ChangeInputAction {
  type: typeof CHANGE_INPUT
  meta: { input: string }
}

export type TodoActionTypes = RemoveAction | CreateAction | ToggleAction | ChangeInputAction;

let autoId: number = 0;

export const actionCreators = {
  create(text: string) {
    return {
      type: CREATE,
      payload: { id: autoId++, text, done: false }
    }
  },
  
  remove(id: number) {
    return {
      type: REMOVE,
      meta: { id }
    }
  },

  toggle(id: number) {
    return {
      type: TOGGLE,
      meta: { id }
    }
  },

  changeInput(input: string) {
    return {
      type: CHANGE_INPUT,
      meta: { input }
    }
  },
};


// reducer

const initialState: TodoState = {
  todoItems: [],
  input: ''
};

export function todoReducer( state: TodoState = initialState, action: TodoActionTypes ): TodoState {
  console.log(action)
  switch(action.type) {
    case CREATE:
      return {
        input: '',
        todoItems: [...state.todoItems, action.payload]
      };
    case REMOVE:
      return {
        ...state,
        todoItems: state.todoItems.filter(todo => todo.id !== action.meta.id)
      };
    case TOGGLE:
      return {
        ...state,
        todoItems: state.todoItems.map(todo => {
          if (todo.id === action.meta.id) {
            todo.done = !todo.done;
          }
          return todo;
        })
      };
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.meta.input
      };
    default: return state;
  }
}