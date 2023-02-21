import { formatDistanceToNowStrict } from 'date-fns';
import { React, Component } from 'react';

export default class TodoListItem extends Component {
  render() {
    const { label, id, done, onDeleted, onToggleDone, onToggleEdit, date, onEditSubmit, editInputHandler, status } = this.props;
    let classNames;
    const deleteBtnClass = 'icon icon-destroy';

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
      <li className={classNames} key={id}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={onToggleDone}
            checked={classNames === 'completed'}
          ></input>
          <label>
            <span className="description">{label}</span>
            <span className="created">created {formatDistanceToNowStrict(date)} ago</span>
          </label>

          <button className="icon icon-edit" onClick={onToggleEdit}></button>

          <button className={deleteBtnClass} onClick={onDeleted}></button>
        </div>
        {editInput}
      </li>
    );
  }
}
