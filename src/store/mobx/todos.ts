import { observable, action } from 'mobx';

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

class Todos implements TodosMobxStore {
    @observable public todoItems: TodoItemDataParams[] = [];
    @observable public input: string = '';
    @observable public autoId: number = 0;

    @action
    public create(): void {
        this.autoId += 1;
        this.todoItems = this.todoItems.concat({
            id: this.autoId,
            text: this.input,
            done: false
        });
        this.input = '';
    }

    @action
    public remove(id: number): void {
        this.todoItems = this.todoItems.filter(todo => todo.id !== id);
    }

    @action
    public toggle(id: number): void {
        this.todoItems = this.todoItems.map(todo => {
            if (todo.id === id) {
                todo.done = !todo.done;
            }
            return todo;
        })
    }

    @action
    public changeInput(input: string) {
        this.input = input;
    }
}

export const createTodoStore = () => {
    return new Todos();
}