import { PropTypes } from 'prop-types';
import React from 'react';

import TodoListItem from '../todo-list-item';

const TodoList = ({ todos, onDeleted, 
  onToggleDone, onToggleEdit, 
  onEditSubmit, editInputHandler,
  onTimerStart, onTimerStop}) => {
    const elements = todos.map((item) => (
      <TodoListItem
      {...item}
      key={item.id}
      onDeleted={() => onDeleted(item.id)}
      onToggleDone={() => onToggleDone(item.id)}
      onToggleEdit={() => onToggleEdit(item.id)}
      onEditSubmit={() => onEditSubmit(item.id)}
      editInputHandler={editInputHandler}
      onTimerStart={() => onTimerStart(item.id)}
      onTimerStop={() => onTimerStop(item.id)}
      
      />
      ));
  return <ul className="todo-list">{elements}</ul>;
};

export default TodoList;

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
