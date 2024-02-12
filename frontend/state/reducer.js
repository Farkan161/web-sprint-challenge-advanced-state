import { combineReducers } from 'redux';

const initialWheelState = 0;

function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case 'MOVE_CLOCKWISE':{
      const nextIndex = state +1
    console.log(nextIndex)
     return  nextIndex >  5? 0 : nextIndex 
    }
      
    case 'MOVE_COUNTERCLOCKWISE': {
      const nextIndex = state -1
      return nextIndex < 0? 5: nextIndex
    }
      
    default:
      return state;
  }
}

const initialQuizState = null;

function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case 'SET_QUIZ_INTO_STATE':
      return action.payload
    default:
      return state;
  }
}

const initialSelectedAnswerState = null;

function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case 'SET_SELECTED_ANSWER':
      // Update state logic if needed
      return action.payload
    default:
      return state;
  }
}

const initialMessageState = '';

function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case 'SET_INFO_MESSAGE':
      
      return action.payload
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
};

function form(state = initialFormState, action) {
  switch (action.type) {
    case 'RESET_FORM':
      return initialFormState;
      case 'INPUT_CHANGE':
          return {...state, [action.payload.inputId]: action.payload.value}
    default:
      return state;
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form });
