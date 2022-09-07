import { useState } from 'react';
import styles from './Todo.module.css';
import { DragSourceMonitor, useDrag } from 'react-dnd';
import { ITodo } from '../../../types/todo.types';

interface ITodoProps {
  todo: ITodo;
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  tomorrowList: ITodo[];
  setTomorrowList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

function Todo({
  todo,
  todos,
  setTodos,
  tomorrowList,
  setTomorrowList,
}: ITodoProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: { todo },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const checkHandler = () => {
    setChecked(!checked);
  };

  const deleteHandler = (id: any) => {
    let newTodos = todos.filter((todo) => todo.id !== id);
    let newTomList = tomorrowList.filter((todo) => todo.id !== id);
    if (checked) {
      setTodos(newTodos);
      setTomorrowList(newTomList);
    }
  };

  return (
    <div className={styles.todo} ref={drag}>
      <input type='checkbox' onChange={checkHandler} />
      <label className={styles.strikethrough}>{todo.task}</label>
      <div className={styles.xbuttonContainer}>
        {checked ? (
          <div id={styles.mdiv} onClick={() => deleteHandler(todo.id)}>
            <div className={styles.mdiv}>
              <div className={styles.md}></div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Todo;
