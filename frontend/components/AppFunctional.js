import React, { useState } from 'react';
import axios from 'axios';

// Suggested initial states

const initialMessage = '';
const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

export default function AppFunctional(props) {
    // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);

  function getXY(index) {
     // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
    const X = parseInt(index / 3) + 1;
    const Y = (index % 3) + 1;
    return { X, Y };
  }

  function getXYMessage() {
     // Use this helper to reset all states to their initial values.
    const { X, Y } = getXY(index);
    return `Coordinates (${X}, ${Y})`;
  }

  function reset() {
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
  }

  function getNextIndex(direction) {
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
  }

  function move(evt) {
      // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);
    if (nextIndex !== index) {
      setIndex(nextIndex);
      setSteps(steps + 1);
      setMessage('');
    } else {
      setMessage(`You can't go ${direction}`);
    }
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
    evt.preventDefault();
    const { X, Y } = getXY(index);
    axios
      .post('http://localhost:9000/api/result', { email, x: X, y: Y, steps })
      .then((res) => setMessage(res.data.message))
      .catch((err) => setMessage(err.response.data.message));
    setEmail('');
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">
          You moved {steps} {steps === 1 ? 'time' : 'times'}
        </h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          value={email}
          placeholder="type email"
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
