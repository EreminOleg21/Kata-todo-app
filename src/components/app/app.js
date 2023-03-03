import { Component } from 'react';
import { v4 } from 'uuid'

import TodoList from '../todo-list';
import NewTodo from '../new-todo';
import './app.css';
import Footer from '../footer';

export default class App extends Component {
  state = {
    todoData: [],
    term: '',
    filter: '',
  };

  componentDidMount() {
    this.updateTime();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  createTask = (text, time) => ({
    label: text,
    done: false,
    id: v4(),
    date: new Date(),
    time,
    status: '',
    timeStarted: false,
  });

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  addNewTodo = (text, min, sec) => {
    const newItem = this.createTask(text, Number(min) * 60 + Number(sec));
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];
      return {
        todoData: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  search(items, term) {
    if (term.length === 0) {
      return items;
    }
    return items.filter((item) => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  }

  onFilterChange = (value) => {
    this.setState({
      filter: value,
    });
  };

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArr = todoData.filter((item) => !item.done);
      return {
        todoData: newArr,
      };
    });
  };

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        if (item.status === 'editing') {
          return { ...item, status: '' };
        }
        if (item.id === id) {
          return { ...item, status: 'editing' };
        }
        return item;
      }),
    }));
  };

  editInputHandler = (id, value) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        if (item.id === id) {
          return { ...item, label: value };
        }
        return item;
      }),
    }));
  };

  onEditSubmit = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        if (item.id === id) {
          return { ...item, status: '' };
        }
        return item;
      }),
    }));
  };

  onTimerStart = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        if (id === item.id) {
          return { ...item, timeStarted: true }
        }
        return item;
      }),
    }))
  };

  onTimerStop = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) => {
        if (id === item.id) {
          return { ...item, timeStarted: false }
        }
        return item;
      }),
    }))
  };  

  updateTime = () => {
    this.interval = setInterval(() => {
      this.setState(({ todoData }) => {
        const newArr = todoData.map((item) => {
          if (item.time === 0 || item.status === 'completed') {
            return item;
          }
          if (item.timeStarted) {
            item.time -= 1;
          }
          return item;
        });
        return {
          items: newArr,
        };
      });
    }, 1000);
  };

  render() {
    const { filter, todoData, term, time } = this.state;
    
    const visibleItems = this.filter(this.search(todoData, term), filter);

    return (
      <div className="todoapp">
        <h1>Todos</h1>

        <div className="top-panel d-flex">
          <NewTodo 
          addNewTodo={this.addNewTodo}/>
        </div>

        <TodoList
          todos={visibleItems}
          time={time}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onToggleEdit={this.onToggleEdit}
          editInputHandler={this.editInputHandler}
          onEditSubmit={this.onEditSubmit}
          onTimerStart={this.onTimerStart}
          onTimerStop={this.onTimerStop}
        />
        <footer>
          <Footer
            todoData={todoData}
            filter={filter}
            onFilterChange={this.onFilterChange}
            onClearCompleted={this.onClearCompleted}
          />
        </footer>
      </div>
    );
  }
}
