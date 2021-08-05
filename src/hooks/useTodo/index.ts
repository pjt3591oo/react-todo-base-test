import { useState, useEffect } from 'react';
import { getTodos, State, Todo } from '../../apis/todo';

interface Props {
  getTodos: () => Promise<Todo[]>;
}

const useTodo = ( { getTodos }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodo()
  }, []);

  async function fetchTodo() {
    // TODO: 의존성을 제거한다 => props로 통신 객체를 전달받는다.
    const data: Todo[] = await getTodos();
    setTodos(data);
  }

  const addTodo = (text: string) => {
    setTodos([...todos, { id: todos.length, text, isActive: State.ACTIVE }]);
  }

  const cancelTodoByIdx = (idx: number) => {
    // 방법1: [GREEN LOGIC] use a filter to find the todo
    // setTodos(todos.filter((todo: Todo, todoIdx: number) => todoIdx !== idx));

    // 최적화 실패 방법: [RED LOGIC] slice the array
    // const newTodos = Array<Todo>();
    // newTodos.concat(todos.slice(0, idx), todos.slice(idx, todos.length));
    // setTodos(newTodos);
    
    // 최적화 성공 방법: [GREEN LOGIC] slice the array
    let newTodos = Array<Todo>();
    newTodos = newTodos.concat(todos.slice(0, idx), todos.slice(idx+1, todos.length));
    setTodos(newTodos);
  }

  return {
    todos, addTodo, cancelTodoByIdx
  }
}

export default useTodo;