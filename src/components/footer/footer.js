import { React, Component } from 'react';
import { PropTypes } from 'prop-types';

import Filters from '../filters';

export default class Footer extends Component {
  render() {
    const { todoData, filter, onFilterChange, onClearCompleted } = this.props;

    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <footer className="footer">
        <span className="todo-count">{todoCount} items left</span>
        <Filters todoData={todoData} filter={filter} onFilterChange={onFilterChange} />
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.defaultProps = {
  todoData: [],
  filter: '',
  onFilterChange: () => {},
  onClearCompleted: () => {},
};

Footer.propTypes = {
  todoData: PropTypes.array,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func,
  onClearCompleted: PropTypes.func,
};
