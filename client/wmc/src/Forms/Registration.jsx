import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import all_data from "../animation";

const RegistrationForm = () => {

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [style, setStyle] = useState({
    nextStyle: {
      display: "none"
    },
    prevStyle: {
      display: "none"
    },
    submitStyle: {
      display: "none"
    }
  });

  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (currentQuestion == 0) {
      setStyle({
        ...style,
        prevStyle: {
          display: "none"
        },
        nextStyle: {
          display: "inline-block"
        },
      });
    } else if (currentQuestion == qArr.length - 1) {

      setStyle({
        nextStyle: {
          display: "none"
        },
        prevStyle: {
          display: "inline-block"
        },
        submitStyle: {
          display: "inline-block"
        }
      });

    } else {
      setStyle({
        prevStyle: {
          display: "inline-block"
        },
        nextStyle: {
          display: "inline-block"
        },
        submitStyle: {
          display: "none"
        }
      });
    }

    
  }, [currentQuestion]);

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
    },
    {
      question: "Confirm your password",
      answer: state.confirmPassword,
      stateName: Object.keys(state)[3],
    }
  ];

  // handle submit api call to backend
  const handleSubmit = async () => {

    if (state.password !== state.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/register`, {
        name: state.name,
        email: state.email,
        password: state.password
      });

      console.log(res);

      if (res.data.success) {
        toast.success("Registration successful");
        navigate("/login");
      } else {
        toast.error(res.data.error);
      }
    } catch (err) {
      // toast.error(err.response.data.message);
      console.log(err);
    }
  }

  return (
    <div className='text-light text-center' style={{ padding: "5% 17%" }}>
      <h1 className='p-5'>{qArr[currentQuestion].question}</h1>
      <input className='mx-2' type={currentQuestion == 2 || currentQuestion == 3 ? "password" : "text"} value={qArr[currentQuestion].answer} onChange={(e) => {
        setState({
          ...state,
          [qArr[currentQuestion].stateName]: e.target.value,
        })
      }} />
      <button style={style.nextStyle} onClick={() => all_data.fade0(qArr, currentQuestion, setCurrentQuestion)}>Next</button>
      <button style={style.submitStyle} onClick={handleSubmit}>Submit</button>
      <button style={style.prevStyle} onClick={() => {
        setCurrentQuestion(currentQuestion - 1);
      }}>Back</button>
    </div>
  );
};

export default RegistrationForm;
