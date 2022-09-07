import { useState } from 'react';
import styles from './ToDoWindow.module.css';
import TaskInput from './typeInput/TaskInput';
import Calendar from './calendar/Calendar';
import Today from './Today';
import Tomorrow from './Tomorrow';
import { ITodo } from '../../types/todo.types';

function TodoWindow() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [tomorrowList, setTomorrowList] = useState<ITodo[]>([]);

  return (
    <div className={styles.windowContainer}>
      <Today
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        todos={todos}
        setTodos={setTodos}
        tomorrowList={tomorrowList}
        setTomorrowList={setTomorrowList}
      />
      <Tomorrow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setTodos={setTodos}
        todos={todos}
        tomorrowList={tomorrowList}
        setTomorrowList={setTomorrowList}
      />
      <Calendar />
      <TaskInput todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default TodoWindow;
