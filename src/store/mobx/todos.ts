import { observable, action, autorun } from 'mobx';

export interface TodoItemDataParams {
  id: number
  text: string
  done: boolean
}

export interface TodosMobxStore {
  todoItems: TodoItemDataParams[]
  input: string
  autoId: number
  create(): void
  remove(id: number): void
  toggle(id: number): void
  changeInput(input: string): void
}

export const createTodoStore = () => {

  const store: TodosMobxStore = {
    todoItems: [],
    input: '',
    autoId: 0,

    create(): void {
      this.autoId += 1;
      this.todoItems = this.todoItems.concat({
        id: this.autoId,
        text: this.input,
        done: false
      });
      this.input = '';
    },
    remove(id: number): void {
      this.todoItems = this.todoItems.filter(todo => todo.id !== id);
    },
    toggle(id: number): void {
      this.todoItems = this.todoItems.map(todo => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
        return todo;
      })
    },
    changeInput(input: string) {
      this.input = input;
    }
  };

  const actions = {
    create: action,
    remove: action,
    toggle: action,
    changeInput: action
  };

  return observable(store, actions);
}

autorun(reaction => {
  reaction.dispose();
});