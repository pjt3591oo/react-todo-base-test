import { useState } from 'react';
import useTodo from '../../hooks/useTodo';

import { getTodos } from '../../apis/todo';

const Todo = (props: any) => {
  const [ text, setText ] = useState<string>('');
  const { todos, addTodo, cancelTodoByIdx } = useTodo({getTodos});
  
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const onSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTodo(text);
      setText('');
    }
  };

  return (
    <div>
      <input
        data-test="todo-input"
        type="text"
        value={text}
        onChange={ onChangeHandler }
        onKeyUp={ onSubmit }
      />

      <div>
        {todos.map((todo, idx) => (
          <div key={idx}>
            <input data-test="todo-item" type="checkbox"  onChange={() => cancelTodoByIdx(idx)}></input>
            <label>{todo.text}</label>
          
            <span data-test="todo-cancel" onClick={() => cancelTodoByIdx(idx) }>X</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
