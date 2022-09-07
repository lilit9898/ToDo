import React, { useEffect, useState } from 'react';
import styles from './TaskInput.module.css';
import uniqid from 'uniqid';
import { ITodo } from '../../../types/todo.types';

interface ITaskInputProps {
  todos: ITodo[];
  setTodos: (arg: (prev: ITodo[]) => ITodo[]) => void;
}

function TaskInput({ todos, setTodos }: ITaskInputProps): JSX.Element {
  const [inputText, setInputText] = useState<string>('');

  useEffect(() => {
    const data = localStorage.getItem('todos');
    if (data !== null) setTodos(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const submitInputHandler = () => {
    const id = uniqid();
    const newTodo = {
      id: id,
      task: inputText,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInputText('');
  };

  const enterKeyPress = (e: any) => {
    submitInputHandler();
    e.preventDefault();
  };

  return (
    <div className={styles.newTodoCont}>
      <div className={styles.inputImg}>
        <form className={styles.inputContainer} onSubmit={enterKeyPress}>
          <input
            value={inputText}
            type='text'
            className={styles.input}
            onChange={(e) => setInputText(e.target.value)}
          />
        </form>
        <div className={styles.sendIconCont} onClick={submitInputHandler}>
          <img
            alt='send'
            src='./images/arrow-send.ico'
            className={styles.sendIcon}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskInput;
