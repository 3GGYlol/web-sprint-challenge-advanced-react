// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
// ❗ OPTIONAL, not required to pass the sprint
import React from 'react'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

const initialState = {
  message: initialMessage,
  email: initialEmail,
  index: initialIndex,
  steps: initialSteps,
}

export default class AppClass extends React.Component {
  state = {
    message: initialMessage,
    email: initialEmail,
    index: initialIndex,
    steps: initialSteps,
  };

  getXY = () => {
    const { index } = this.state;
    const X = (index % 3) + 1;
    const Y = Math.floor(index / 3) + 1;
    return { X, Y };
  };

  getXYMessage = () => {
    const { X, Y } = this.getXY();
    return `Coordinates (${X}, ${Y})`;
  };

  reset = () => {
    this.setState({
      message: initialMessage,
      email: initialEmail,
      index: initialIndex,
      steps: initialSteps,
    });
  };

  getNextIndex = (direction) => {
    const { index } = this.state;
    switch (direction) {
      case 'left':
        return index % 3 === 0 ? index : index - 1;
      case 'right':
        return index % 3 === 2 ? index : index + 1;
      case 'up':
        return index < 3 ? index : index - 3;
      case 'down':
        return index > 5 ? index : index + 3;
      default:
        return index;
    }
  };

  move = (evt) => {
    const direction = evt.target.id;
    const nextIndex = this.getNextIndex(direction);
    if (nextIndex !== this.state.index) {
      this.setState((prevState) => ({
        index: nextIndex,
        steps: prevState.steps + 1,
        message: '',
      }));
    } else {
      this.setState({ message: `You can't go ${direction}` });
    }
  };

  onChange = (evt) => {
    this.setState({ email: evt.target.value });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    const { index } = this.state;
    const { X, Y } = this.getXY();
    // Simulate async request
    setTimeout(() => {
      console.log(`Email: ${this.state.email}, Coordinates: (${X}, ${Y}), Steps: ${this.state.steps}`);
      this.setState({ message: 'Success!' });
    }, 1000);
  };

  render() {
    const { className } = this.props;
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
            <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
              {idx === this.state.index ? 'B' : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>
            LEFT
          </button>
          <button id="up" onClick={this.move}>
            UP
          </button>
          <button id="right" onClick={this.move}>
            RIGHT
          </button>
          <button id="down" onClick={this.move}>
            DOWN
          </button>
          <button id="reset" onClick={this.reset}>
            reset
          </button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            value={this.state.email}
            placeholder="type email"
            onChange={this.onChange}
          ></input>
          <input id="submit" type="submit" value="Submit"></input>
        </form>
      </div>
    );
  }
}
