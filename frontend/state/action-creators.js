import axios from 'axios';
import { RESET_FORM } from "./action-types";

export function moveClockwise() {
  return { type: 'MOVE_CLOCKWISE' };
}

export function moveCounterClockwise() {
  return { type: 'MOVE_COUNTERCLOCKWISE' };
}

export function selectAnswer(selectedAnswer) {
  return { type: 'SET_SELECTED_ANSWER', payload: selectedAnswer };
}

export function setMessage(message) {
  return { type: 'SET_INFO_MESSAGE', payload: message };
}

export function setQuiz(quiz) {
  return { type: 'SET_QUIZ_INTO_STATE', payload: quiz };
}

export function inputChange(inputChange) {
  console.log(inputChange)
  return { type: 'INPUT_CHANGE', payload: inputChange };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    {
      

      axios.get('http://localhost:9000/api/quiz/next')
        .then((res) => {
          console.log(res.data)
          dispatch(setQuiz(res.data));
        })
        .catch((error) => {
          console.error('Error fetching quiz:', error);
          dispatch({ type: 'FETCH_QUIZ_FAILURE' });
        });
    }
  };
}
export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    dispatch(resetForm());
    dispatch({ type: 'POST_ANSWER_REQUEST' });

    axios
      .post('http://localhost:9000/api/quiz/answer', { quiz_id: quizId, answer_id: answerId })
      .then((res) => {
        dispatch(selectAnswer(null));
        dispatch(setMessage(res.data.message))
      })
      .catch((error) => {
        console.error('Error posting answer:', error);
        dispatch({ type: 'POST_ANSWER_FAILURE' });
      }). finally (( ) => {dispatch(fetchQuiz())})
  };
}


export function postQuiz(newQuiz) {
 
  return function (dispatch) {
    dispatch(resetForm());
    dispatch({ type: 'POST_QUIZ_REQUEST'});

    const payload = {
      question_text: newQuiz.newQuestion,
      true_answer_text: newQuiz.newTrueAnswer,
      false_answer_text:newQuiz.newFalseAnswer,
    };

    axios
      .post('http://localhost:9000/api/quiz/new', payload)
      .then((res) => {
        dispatch({ type: 'POST_QUIZ_SUCCESS', payload: res.data });
        dispatch(setMessage('Quiz successfully created!'));
      })
      .catch((error) => {
        console.error('Error posting quiz:', error);
        dispatch({ type: 'POST_QUIZ_FAILURE' });
      });
  };
}
