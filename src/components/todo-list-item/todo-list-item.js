import { formatDistanceToNowStrict } from 'date-fns';
import { React } from 'react';
import Timer from '../timer';

export default function TodoListItem(props) {
    const { label, id, done, 
      onDeleted, onToggleDone, 
      onToggleEdit, date, onEditSubmit, 
      editInputHandler, status, time,
      updateTime} = props;

    let classNames;
    if (done) {
      classNames = 'completed';
    }

    if (status === 'editing') {
      classNames = 'editing';
    }    

    function onSubmitHandler(e) {
      e.preventDefault();
      onEditSubmit(id);
    }
  
    const editInput = status === 'editing' ? (
        <form onSubmit={(e) => onSubmitHandler(e)}>
          <input
            type="text"
            className="edit"
            value={label}
            autoFocus
            onChange={(e) => editInputHandler(id, e.target.value)}
          />
        </form>
      ) : (
        ''
      );

    return (
      <li className={status} key={id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={onToggleDone}
            checked={classNames === 'completed'}
          ></input>
          <label>
            <span className="title">{label}</span>
            <Timer 
            timer={time}
            updateTime={updateTime}
            status={status}/>
            <span className="description">created {formatDistanceToNowStrict(date)} ago</span>
          </label>

          <button className="icon icon-edit" onClick={onToggleEdit}></button>

          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editInput}
      </li>
    );
  }
