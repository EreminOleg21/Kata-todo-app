import { PropTypes } from 'prop-types';
import React from 'react';

import TodoListItem from '../todo-list-item';

export default function TodoList({ items, onDeleted, 
  onToggleDone, onToggleEdit, 
  onEditSubmit, editInputHandler,
   filter, updateTime}) {
    const filterItems = (items, filter) => {
      if (filter === 'active') {
        return items.filter((item) => !item.done)
      }
      if (filter === 'done') {
        return items.filter((item) => item.done)
      }
      return items
    }
    const elements = filterItems(items, filter).map((item) => (
      <TodoListItem
      {...item}
      key={item.id}
      onDeleted={() => onDeleted(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
      onToggleEdit={() => onToggleEdit(item.id)}
      onEditSubmit={() => onEditSubmit(item.id)}
      editInputHandler={editInputHandler}
      updateTime={updateTime}      
      />
      ));
  return <ul className="todo-list">{elements}</ul>;
}

TodoList.defaultProps = {
  todos: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEdit: () => {},
  editInputHandler: () => {},
  onEditSubmit: () => {},
};

TodoList.propTypes = {
  todos: PropTypes.array,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEdit: PropTypes.func,
  editInputHandler: PropTypes.func,
  onEditSubmit: PropTypes.func,
};
