import { Component } from "react";
import getPadTime from "../../helpers/getPadTime";

export default class Timer extends Component {
    render() {
        const {onTimerStart, onTimerStop, time} = this.props
        const minutes = getPadTime(Math.floor(time / 60));
        const seconds = getPadTime(time - minutes * 60)
        return (
    <span className="description">
      <button className="icon icon-play"
       onClick={onTimerStart}></button>
      <button className="icon icon-pause"
        onClick={onTimerStop}></button>
        {minutes}:{seconds}
    </span>
        )
    }
}