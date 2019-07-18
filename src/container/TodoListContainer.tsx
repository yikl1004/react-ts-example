import React, { FC } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { StoreState } from "store/redux/modules";
import { TodoItemDataParams, actionCreators as todosActions, TodoActionCreactors } from "store/redux/modules/todos";
import TodoList from "components/todolist";
import { useTodos } from "store/mobx";
import { TodosMobxStore } from "store/mobx/todos";


interface IProps {
  todoItems: TodoItemDataParams[]
  input: string
  todosActions: TodoActionCreactors
}

const STORE_MODE = process.env.REACT_APP_STORE_MODE;

const TodoListContainer: FC<IProps> = ({ input, todosActions, todoItems }: IProps) => {
  let onCreate: (text: undefined) => void,
      onRemove: (id: number) => void,
      onToggle: (id: number) => void,
      onChange: (e: any) => void;
  let todos: TodosMobxStore;

  if ( STORE_MODE === 'REDUX' ) {
    onCreate = (): void => {
      todosActions.create(input);
    };
    onRemove = (id: number): void => {
      todosActions.remove(id);
    };
    onToggle = (id: number): void => {
      todosActions.toggle(id)
    };
    onChange = (e: React.FormEvent<HTMLElement>) => {
      todosActions.changeInput(
        (e.target as HTMLFormElement).value
      );
    };
  } else if ( STORE_MODE === 'MOBX' ) {
    todos = useTodos();
    onCreate = todos.create;
    onRemove = todos.remove;
    onToggle = todos.toggle;
    onChange = (e: React.FormEvent<HTMLElement>) => {
      todos.changeInput;
    }
  }
  
  return (
    <TodoList
      input={input}
      todoItems={todoItems}
      onCreate={onCreate}
      onRemove={onRemove}
      onToggle={onToggle}
      onChange={onChange}
    />
  );
}

// redux
export default connect(
  ({ todos }: StoreState) => ({
    input: todos.input,
    todoItems: todos.todoItems
  }),
  (dispatch: Dispatch) => ({
    todosActions: bindActionCreators(todosActions, dispatch)
  })
)(TodoListContainer);
