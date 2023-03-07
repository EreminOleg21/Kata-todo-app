import { useState } from 'react';
import { PropTypes } from 'prop-types';

export default function NewTodo(props) {
  const { addNewTodo } = props;
  const [label, setLabel] = useState('')
  const [time, setTime] = useState({min: '', sec: ''})

  const onLabelChange = (e) => {
    const {value} = e.target
    if (value !== '') {
      setLabel(value)
    }
  }

  const onSubmit = (e) => {
    if (e.key === 'Enter') {
    e.preventDefault();
    addNewTodo(label, time.min, time.sec);
    setLabel('')
    setTime({min: '', sec: ''})
  } 
  };
  return (
      <form className="new-todo-form" onKeyUp={onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          name='description'
          onChange={onLabelChange}
          value={label}
          autoFocus
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          name='minutes'
          onChange={(e) => setTime((prev) => ({ ...prev, min: e.target.value}))}
          value={time.min}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          name='seconds'
          onChange={(e) => setTime((prev) => ({...prev, sec: e.target.value}))}
          value={time.sec}
        /> 
       </form>
    );
  }

NewTodo.defaultProps = {
  addNewTodo: () => {},
};

NewTodo.propTypes = {
  addNewTodo: PropTypes.func,
};
