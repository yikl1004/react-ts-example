import React, { FC } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { StoreState } from "store/redux/modules";
import { TodoItemDataParams, actionCreators as todosActions } from "store/redux/modules/todos";
import TodoList from "components/todolist";


interface IProps {
  todoItems: TodoItemDataParams[]
  input: string
  todosActions: typeof todosActions
}


const TodoListContainer: FC<IProps> = ({ input, todosActions, todoItems }) => {
  const onCreate = (): void => { todosActions.create(input) };
  const onRemove = (id: number): void => { todosActions.remove(id) };
  const onToggle = (id: number): void => { todosActions.toggle(id) };
  const onChange = (e: React.FormEvent<HTMLElement>) => {
    todosActions.changeInput((e.target as HTMLFormElement).value);
  };
  const todoListProps = { input, todoItems, onCreate, onRemove, onToggle, onChange }
  
  return <TodoList {...todoListProps} />;
}

const mapStateToProps = ({ todos }: StoreState) => ({
  input: todos.input,
  todoItems: todos.todoItems
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  todosActions: bindActionCreators(todosActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);