import * as React from 'react';
import { FunctionComponent } from 'react';


interface IProps {
  text: string;
  done: boolean;
  onToggle(): void;
  onRemove(): void;
}

const TodoItem: FunctionComponent<IProps> = ({ text, done, onToggle, onRemove }) => {
  return (
    <li>
      <b
        onClick={onToggle}
        style={{ textDecoration: done ? 'line-through' : 'none' }}
      >
        { text }
      </b>
      <button
        style={{ all: 'unset', marginLeft: '0.5rem' }}
        onClick={onRemove}
      >
        [지우기]
      </button>
    </li>
  )
}

export default TodoItem;