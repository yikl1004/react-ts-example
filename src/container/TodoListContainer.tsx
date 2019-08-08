import React, { FC } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { observer } from 'mobx-react-lite';
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



// REDUX
const TodoListContainerREDUX: FC<IProps> = ({ input, todosActions, todoItems }: IProps) => {
  const onCreate = (): void => {
    todosActions.create(input);
  };
  const onRemove = (id: number): void => {
    todosActions.remove(id);
  };
  const onToggle = (id: number): void => {
    todosActions.toggle(id)
  };
  const onChange = (e: React.FormEvent<HTMLElement>) => {
    todosActions.changeInput(
      (e.target as HTMLFormElement).value
    );
  };

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

// MOBX
const TodoListContainerMOBX: FC<IProps> = observer(() => {
  const todos: TodosMobxStore = useTodos();
  const onCreate = (): void => {
    todos.create();
  };
  const onRemove = (id: number): void => {
    todos.remove(id);
  };
  const onToggle = (id: number): void => {
    todos.toggle(id);
  };

  return (
    <TodoList
      input={todos.input}
      todoItems={todos.todoItems}
      onCreate={onCreate}
      onRemove={onRemove}
      onToggle={onToggle}
      onChange={(e: any) => todos.changeInput(e.target.value)}
    />
  );
});



const exportComponent = STORE_MODE === 'REDUX' ? connect(
  ({ todos }: StoreState) => ({
    input: todos.input,
    todoItems: todos.todoItems
  }),
  (dispatch: Dispatch) => ({
    todosActions: bindActionCreators(todosActions, dispatch)
  }))(TodoListContainerREDUX)
  : TodoListContainerMOBX;

// redux
export default exportComponent;
