import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

export function Form(props) {
   const  {postQuiz, inputChange, form} = props
console.log(form)
  const onChange = (evt) => {
    const { value, id} = evt.target;
    console.log(value , id)
    inputChange({ inputId:id,  value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log(form)
    postQuiz(form)
  };
  const isDisabled = () => {
    return Object.values(form).some(value => !value.trim().length)
  }
  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" value={form.newQuestion} placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" value={form.newTrueAnswer} placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" value={form.newFalseAnswer} placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled = {isDisabled()}>Submit new quiz</button>
    </form>
  );
}


export default connect(st =>st, actionCreators)(Form);
