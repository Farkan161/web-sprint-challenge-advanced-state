import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

const Wheel = ({ wheel, moveClockwise, moveCounterClockwise }) => {
  const handleWheelClick = (e) => {
    const buttonId = e.target.id;
    if (buttonId === 'clockwiseBtn') {
      moveClockwise();
    } else if (buttonId === 'counterClockwiseBtn') {
      moveCounterClockwise();
    }
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        {[...Array(6).keys()].map((key) => (
          <div
            className={`cog${wheel === key ? ' active' : ''}`}
            key={key}
            style={{ '--i': key }}
          >
            {wheel === key ? 'B' : null}
          </div>
        ))}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleWheelClick}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleWheelClick}>
          Clockwise
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    wheel: state.wheel, // Assuming your redux state has a property 'wheel'
  };
};

export default connect(mapStateToProps, actionCreators)(Wheel);
