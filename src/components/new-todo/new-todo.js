import { React, Component } from 'react';
import { PropTypes } from 'prop-types';

export default class NewTodo extends Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { addNewTodo } = this.props;
    const { label } = this.state;
    e.preventDefault();
    addNewTodo(label);
    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={label}
          required
          autoFocus
        />
      </form>
    );
  }
}

NewTodo.defaultProps = {
  addNewTodo: () => {},
};

NewTodo.propTypes = {
  addNewTodo: PropTypes.func,
};
