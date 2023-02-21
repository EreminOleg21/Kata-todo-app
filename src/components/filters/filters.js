import { React, Component } from 'react';
import { PropTypes } from 'prop-types';

export default class Filters extends Component {
  filterButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;
    const buttons = this.filterButtons.map(({ name, label }) => {
      const isActive = filter === name;
      let classNames = '';

      if (isActive) {
        classNames = 'selected';
      }
      return (
        <li key={name}>
          <button key={name} type="button" onClick={() => onFilterChange(name)} className={classNames}>
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}

Filters.defaultProps = {
  filter: '',
  onFilterChange: () => {},
};

Filters.propTypes = {
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func,
};
