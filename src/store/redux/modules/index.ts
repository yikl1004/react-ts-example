import { TodoState, todoReducer as todos } from "./todos";
import { combineReducers } from "redux";

export interface StoreState {
  todos: TodoState
}

export default combineReducers<StoreState>({ todos });