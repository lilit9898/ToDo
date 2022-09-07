import React from 'react';
import { ITodo } from '../../types/todo.types';
import styles from './Today.module.css';
import Todo from './todo/Todo';
import Tomorrow from './Tomorrow';

interface ITodayProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  tomorrowList: ITodo[];
  setTomorrowList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

function Today({
  isOpen,
  setIsOpen,
  todos,
  setTodos,
  tomorrowList,
  setTomorrowList,
}: ITodayProps) {
  let todosRender = todos.map((todo, i) => {
    return (
      <Todo
        todo={todo}
        key={todo.id}
        todos={todos}
        setTodos={setTodos}
        tomorrowList={tomorrowList}
        setTomorrowList={setTomorrowList}
      />
    );
  });

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={styles.dayDiv}>
        Today
        <div onClick={toggleHandler}>
          <img
            // style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            src='/images/arrow.ico'
            alt='arrow'
            className={`${isOpen ? styles.open : styles.closed}`}
          />
        </div>
      </div>
      <div className={styles.todoList}>{isOpen && todosRender}</div>
    </div>
  );
}

export default Today;
