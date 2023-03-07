import { Component, useState} from 'react';
import { v4 } from 'uuid'

import TodoList from '../todo-list';
import NewTodo from '../new-todo';
import './app.css';
import Footer from '../footer';

export default function App() {
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')

  const createTask = (text, time) => ({
    label: text,
    done: false,
    id: v4(),
    date: new Date(),
    time,
    status: '',
  });

  const addNewTodo = (text, min, sec) => {
    const newItem = createTask(text, Number(min) * 60 + Number(sec));
    const newArr = [...items, newItem]
    setItems(newArr)
  };

  const deleteItem = (id) => {
    const newArr = items.filter((item) => id !== item.id)
    setItems(newArr)
  };

  const onToggleDone = (id) => {
    const newArr = items.map((item) => {
      if (item.id === id) {
        item.status = item.status === '' ? 'completed' : ''
        item.done = !item.done
      }
      return item
    })
    setItems(newArr)
  };

  const onFilterChange = (value) => {
    setFilter(value)
  };

  const onClearCompleted = () => {
    const newArr = items.filter((item) => !item.done)
    setItems(newArr)
  };

  const onToggleEdit = (id) => {
    const newArr = items.map((item) => {
      if (item.status === 'editing') {
        item.status = ''
      }
      if (item.id === id) {
        item.status = 'editing'
      }
      return item;
    })
    setItems(newArr)
  };

  const editInputHandler = (id, value) => {
    const newArr = items.map((item) => {
      if (item.id === id) {
        item.label = value
      }
      return item;
    })
    setItems(newArr)
  };

  const onEditSubmit = (id) => {
    const newArr = items.map((item) => {
      if (item.id === id && !item.done) {
        item.status = ''
      } else {
        item.status = 'completed'
      }
      return item;
    })
    setItems(newArr)
  };

 const updateTime = (id, newTime) => {
    const newArr = items.map((item) => {
        if (item.id === id) {
          item.time = newTime
        }
        return item
    })
    setItems(newArr)
  };

    return (
      <section className="todoapp">
        <h1>Todos</h1>

        <div className="top-panel d-flex">
          <NewTodo 
          addNewTodo={addNewTodo}/>
        </div>

        <TodoList
          filter={filter}
          items={items}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          onToggleEdit={onToggleEdit}
          editInputHandler={editInputHandler}
          onEditSubmit={onEditSubmit}
          updateTime={updateTime}
        />
        <footer>
          <Footer
            items={items}
            filter={filter}
            onFilterChange={onFilterChange}
            onClearCompleted={onClearCompleted}
          />
        </footer>
      </section>
    );
  }
