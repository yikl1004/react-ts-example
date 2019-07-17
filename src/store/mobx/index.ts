import { createTodoStore } from './todos';
import { createContext, useContext } from 'react';


export class RootStore {
  todos = createTodoStore();
}


// global context
export interface GlobalContext {
  rootStore: RootStore
}

export const globalContext = createContext<GlobalContext>({} as GlobalContext);
export const GlobalContextProvider = globalContext.Provider;
export const GlobalContextConsumer = globalContext.Consumer;

export const useTodos = () => {
  const global = useContext(globalContext);

  return global.rootStore.todos;
}