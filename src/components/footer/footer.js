import { React } from 'react';
import { PropTypes } from 'prop-types';

import Filters from '../filters';

export default function Footer(props) {
  const { items, filter, onFilterChange, onClearCompleted } = props;
  const doneCount = items.filter((el) => el.done).length;
  const todoCount = items.length - doneCount;
  return (
          <footer className="footer">
            <span className="todo-count">{todoCount} items left</span>
            <Filters items={items} filter={filter} onFilterChange={onFilterChange} />
            <button className="clear-completed" onClick={onClearCompleted}>
              Clear completed
            </button>
          </footer>
        );
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
