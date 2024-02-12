import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

function Quiz(props) {
  const { quizData, fetchQuiz, selectAnswer, selectedAnswer, postAnswer } = props;

  useEffect(() => {
    !quizData && fetchQuiz();
  }, []);

  const handleSubmit = () => {
    if (selectedAnswer !== null && quizData) {
      postAnswer(quizData.quiz_id, selectedAnswer);
    }
  };

  return (
    <div id="wrapper">
      {!quizData ? (
        'Loading next quiz...'
      ) : (
        <>
          <h2>{quizData.question}</h2>
          <div id="quizAnswers">
            {quizData.answers.map((answer, index) => (
              <div
                key={index}
                className={`answer ${selectedAnswer === answer.answer_id ? 'selected' : ''}`}
                onClick={() => selectAnswer(answer.answer_id)}
              >
                {answer.text}
                <button>
                  {selectedAnswer === answer.answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            ))}
          </div>
          <button id="submitAnswerBtn" onClick={handleSubmit} disabled={selectedAnswer === null}>Submit</button>
        </>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    quizData: state.quiz,
    selectedAnswer: state.selectedAnswer
  };
};

export default connect(mapStateToProps, actionCreators)(Quiz);
