import React, { useEffect } from 'react';
import styles from './Tomorrow.module.css';
import { useState } from 'react';
import { useDrop, DropTargetMonitor } from 'react-dnd';
import Todo from './todo/Todo';
import { ITodo } from '../../types/todo.types';

interface ITomorrowProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  todos: ITodo[];
  tomorrowList: ITodo[];
  setTomorrowList: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

function Tomorrow({
  isOpen,
  setIsOpen,
  setTodos,
  todos,
  tomorrowList,
  setTomorrowList,
}: ITomorrowProps) {
  const [openTomList, setOpenTomList] = useState<boolean>(true);
  const [{ isOver, currentItem }, drop] = useDrop(() => ({
    accept: 'element',
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      currentItem: monitor.getItem<{ todo: ITodo }>(),
    }),
  }));

  useEffect(() => {
    if (isOver) {
      const { todo } = currentItem;
      const removableTodo = todos.filter((item) => item.id !== todo.id);
      setTodos(removableTodo);
      setTomorrowList((prevState) => {
        if (prevState.some((item) => item.id === todo.id)) {
          return prevState;
        } else {
          return [...prevState, todo];
        }
      });
    }
  }, [isOver]);

  let tomorrowRender = tomorrowList.map((todo: ITodo) => {
    return (
      <Todo
        todos={todos}
        todo={todo}
        key={todo.id}
        setTodos={setTodos}
        tomorrowList={tomorrowList}
        setTomorrowList={setTomorrowList}
      />
    );
  });

  useEffect(() => {
    const Tomdata = localStorage.getItem('tomorrowList');
    if (Tomdata !== null) setTomorrowList(JSON.parse(Tomdata));
  }, []);

  useEffect(() => {
    localStorage.setItem('tomorrowList', JSON.stringify(tomorrowList));
  }, [tomorrowList]);

  const toggleHandler1 = () => {
    setOpenTomList(!openTomList);
  };

  return (
    <div>
      <div
        className={styles.dayDiv}
        ref={drop}
        style={{
          boxShadow: isOver ? '0 0 10px 5px rgba(255, 255, 255, 0.8)' : '',
        }}
      >
        Tomorrow
        <div onClick={toggleHandler1}>
          <img
            src='/images/arrow.ico'
            alt='arrow'
            className={`${openTomList ? styles.open : styles.closed}`}
          />
        </div>
      </div>
      <div className={styles.todoList}>{openTomList && tomorrowRender}</div>
    </div>
  );
}

export default Tomorrow;
