import { PropTypes } from 'prop-types';

export default function Filters(props) {
  const filterButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' },
  ];

    const { filter, onFilterChange } = props;
    const buttons = filterButtons.map(({ name, label }) => {
      const isActive = filter === name;
      let classNames = '';

      if (isActive) {
        classNames = 'selected';
      }
      return (
        <li key={name}>
          <button 
          key={name} 
          type="button" 
          onClick={() => onFilterChange(name)} 
          className={classNames} >
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }

Filters.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
};

Filters.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};
