import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const qArr = [
    {
      question: "What is your name?",
      answer: state.name,
      stateName: Object.keys(state)[0],
    },
    {
      question: "What is your email?",
      answer: state.email,
      stateName: Object.keys(state)[1],
    },
    {
      question: "What is your password?",
      answer: state.password,
      stateName: Object.keys(state)[2],
    }
  ];

  return (
    <div className='text-light text-center' style={{ padding: "5% 17%" }}>
      <h1 className='p-5'>{qArr[currentQuestion].question}</h1>
      <input className='mx-2' type="text" value={qArr[currentQuestion].answer} onChange={(e) => {
        setState({
          ...state,
          [qArr[currentQuestion].stateName]: e.target.value,
        })
      }} />
      {currentQuestion === 0 ? <button onClick={() => {
        setCurrentQuestion(currentQuestion + 1);
      }}>Next</button> :
        currentQuestion === qArr.length - 1 ? (
          <>
            <button onClick={() => {
              console.log(state)
              navigate("/")
            }}>Submit</button>
            <button onClick={() => {
              setCurrentQuestion(currentQuestion - 1);
            }}>Back</button>
          </>
        ) :
          <>
            <button onClick={() => {
              setCurrentQuestion(currentQuestion + 1);
            }}>Next</button>
            <button onClick={() => {
              setCurrentQuestion(currentQuestion - 1);
            }}>Back</button>
          </>
      }
    </div>
  );
};

export default RegistrationForm;
