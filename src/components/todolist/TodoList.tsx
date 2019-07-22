import React, { FC } from "react";
import TodoItem from './TodoItem';
import { TodoItemDataParams } from "store/redux/modules/todos";

interface IProps {
  input: string
  todoItems: TodoItemDataParams[]
  onCreate(text?: string | undefined): void
  onRemove(id: number): void
  onToggle(id: number): void
  onChange(e: any): void
}

interface TodoItemState {
  id: number
  text: string
  done: boolean
}

interface State {
  input: string
  todoItems: TodoItemState[]
}

const TodoList: FC<IProps> = ({
  input,
  todoItems,
  onCreate,
  onRemove,
  onToggle,
  onChange
}): JSX.Element => {
  const onSubmitWrapper = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    onCreate();
  };

  return (
    <div>
      <h1>오늘 뭐하지?</h1>
      <form onSubmit={onSubmitWrapper}>
        <input type="text" onChange={onChange} value={input} />
        <button type="submit">추가하기</button>
      </form>
      <ul>
        { todoItems && todoItems.map((todo: TodoItemDataParams, index: number) => (
          <TodoItem
            key={index}
            done={todo.done}
            onToggle={onToggle.bind(null, todo.id)}
            onRemove={onRemove.bind(null, todo.id)}
            text={todo.text}
          />
        )) }
      </ul>
    </div>
  )
}

export default TodoList;