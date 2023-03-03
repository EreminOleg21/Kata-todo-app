import { React, Component } from 'react';
import { PropTypes } from 'prop-types';

export default class NewTodo extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }

  onSecChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
    if (e.key === 'Enter') {
    const { addNewTodo} = this.props;
    const { label, min, sec } = this.state;
    e.preventDefault();
    addNewTodo(label, min, sec);
    this.setState({
      label: '',
      min: '',
      sec: '',
    });
  } 
  };

  render() {
    const { label, min, sec } = this.state;
    return (
      <form className="new-todo-form" onKeyUp={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          name='description'
          onChange={this.onLabelChange}
          value={label}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          name='minutes'
          onChange={this.onMinChange}
          value={min}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          name='seconds'
          onChange={this.onSecChange}
          value={sec}
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
