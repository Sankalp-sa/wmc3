import React, { useState } from 'react'

export default function HouseQuize() {
    const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [question4, setQuestion4] = useState('');
  const [question5, setQuestion5] = useState('');
  const [question6, setQuestion6] = useState('');
  const [question7, setQuestion7] = useState('');
  const [question8, setQuestion8] = useState('');

  const handleAnswerSelect = (questionNumber, house) => {
    // Update the state based on the selected answer for each question
    switch (questionNumber) {
      case 1:
        setQuestion1(house);
        break;
      case 2:
        setQuestion2(house);
        break;
      case 3:
        setQuestion3(house);
        break;
      case 4:
        setQuestion4(house);
        break;
      case 5:
        setQuestion5(house);
        break;
      case 6:
        setQuestion6(house);
        break;
      case 7:
        setQuestion7(house);
        break;
      case 8:
        setQuestion8(house);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Count the answers for each house
    const counts = {
      Gryffindor: 0,
      Ravenclaw: 0,
      Hufflepuff: 0,
      Slytherin: 0,
    };

    // Increment the count for each selected answer
    [question1, question2, question3, question4, question5, question6, question7, question8].forEach((house) => {
      counts[house] += 1;
    });

    // Find the house with the maximum count
    const maxCount = Math.max(...Object.values(counts));

    // Alert the result
    alert(`Welcome to: ${Object.keys(counts).find((house) => counts[house] === maxCount)}`);
  };

  const handleReset = (e) => {
    e.preventDefault();
    // Reset all question states and answers
    window.location.reload();
  };

    return (
        <div className="container text-light" style={{ padding: "5% 15%" }}>
            <form onSubmit={handleSubmit}>
                <h1 className="py-4 text-center">House Quiz</h1>

                <div className="mb-4">
                    <p>Question 1: What traivt do you value the most in a friend?</p>
                    <div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios1" value="Gryffindor" onChange={() => handleAnswerSelect(1,'Gryffindor')} />
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Courage
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios2" value="Ravenclaw" onChange={() => handleAnswerSelect(1,'Ravenclaw')} />
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Intelligence
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios2" value="Hufflepuff" onChange={() => handleAnswerSelect(1,'Hufflepuff')} />
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Loyalty
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios1" id="exampleRadios2" value="Slytherin" onChange={() => handleAnswerSelect(1,'Slytherin')} />
                            <label className="form-check-label" htmlFor="exampleRadios1">
                                Ambition
                            </label>
                        </div>

                    </div>
                </div>

                <div className="mb-4">
                    <p>Question 2: Which subject at Hogwarts do you find most fascinating?</p>
                    <div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                value="Gryffindor"
                                name="exampleRadios2"
                                onChange={() => handleAnswerSelect(2,'Gryffindor')}
                            />
                            <label className="form-check-label" htmlFor="q1_gryffindor">
                                Defense Against the Dark Arts
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                value="Ravenclaw"
                                name="exampleRadios2"
                                onChange={() => handleAnswerSelect(2,'Ravenclaw')}
                            />
                            <label className="form-check-label" htmlFor="q1_ravenclaw">
                                Transfiguration
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                value="Hufflepuff"
                                name="exampleRadios2"
                                onChange={() => handleAnswerSelect(2,'Hufflepuff')}
                            />
                            <label className="form-check-label" htmlFor="q1_hufflepuff">
                                Herbology
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                value="Slytherin"
                                name="exampleRadios2"
                                onChange={() => handleAnswerSelect(2,'Slytherin')}
                            />
                            <label className="form-check-label" htmlFor="q1_slytherin">
                                Potions
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <p>Question 3: Which magical creature appeals to you the most?</p>
                    <div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                value="Gryffindor"
                                name="exampleRadios3"
                                onChange={() => handleAnswerSelect(3,'Gryffindor')}
                            />
                            <label className="form-check-label" htmlFor="q1_gryffindor">
                                Dragon
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                value="Ravenclaw"
                                name="exampleRadios3"
                                onChange={() => handleAnswerSelect(3,'Ravenclaw')}
                            />
                            <label className="form-check-label" htmlFor="q1_ravenclaw">
                                Phoenix
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                value="Hufflepuff"
                                name="exampleRadios3"
                                onChange={() => handleAnswerSelect(3,'Hufflepuff')}
                            />
                            <label className="form-check-label" htmlFor="q1_hufflepuff">
                                Hippogriff
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                value="Slytherin"
                                name="exampleRadios3"
                                onChange={() => handleAnswerSelect(3,'Slytherin')}
                            />
                            <label className="form-check-label" htmlFor="q1_slytherin">
                                Basilisk
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <p>Question 4: You have a challenging task ahead. What approach do you take?</p>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Gryffindor"
                            name="exampleRadios4"
                            onChange={() => handleAnswerSelect(4,'Gryffindor')}
                        />
                        <label className="form-check-label" htmlFor="q1_gryffindor">
                            Face it head-on, even if it's scary
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Ravenclaw"
                            name="exampleRadios4"
                            onChange={() => handleAnswerSelect(4,'Ravenclaw')}
                        />
                        <label className="form-check-label" htmlFor="q1_ravenclaw">
                            Analyze and strategize
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Hufflepuff"
                            name="exampleRadios4"
                            onChange={() => handleAnswerSelect(4,'Hufflepuff')}
                        />
                        <label className="form-check-label" htmlFor="q1_hufflepuff">
                            Seek help and support from friends
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Slytherin"
                            name="exampleRadios4"
                            onChange={() => handleAnswerSelect(4,'Slytherin')}
                        />
                        <label className="form-check-label" htmlFor="q1_slytherin">
                            Use any means necessary to achieve success
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <p>Question 5: What is your favorite magical item?</p>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Gryffindor"
                            name="exampleRadios5"
                            onChange={() => handleAnswerSelect(5,'Gryffindor')}
                        />
                        <label className="form-check-label" htmlFor="q1_gryffindor">
                            Invisibility Cloak
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Ravenclaw"
                            name="exampleRadios5"
                            onChange={() => handleAnswerSelect(5,'Ravenclaw')}
                        />
                        <label className="form-check-label" htmlFor="q1_ravenclaw">
                            Time-Turner
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Hufflepuff"
                            name="exampleRadios5"
                            onChange={() => handleAnswerSelect(5,'Hufflepuff')}
                        />
                        <label className="form-check-label" htmlFor="q1_hufflepuff">
                            Marauder's Map
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Slytherin"
                            name="exampleRadios5"
                            onChange={() => handleAnswerSelect(5,'Slytherin')}
                        />
                        <label className="form-check-label" htmlFor="q1_slytherin">
                            Philosopher's Stone
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <p>Question 6: Which Deathly Hallow would you choose to possess?</p>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Gryffindor"
                            name="exampleRadios6"
                            onChange={() => handleAnswerSelect(6,'Gryffindor')}
                        />
                        <label className="form-check-label" htmlFor="q1_gryffindor">
                            Elder Wand
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Ravenclaw"
                            name="exampleRadios6"
                            onChange={() => handleAnswerSelect(6,'Ravenclaw')}
                        />
                        <label className="form-check-label" htmlFor="q1_ravenclaw">
                            Resurrection Stone
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Slytherin"
                            name="exampleRadios6"
                            onChange={() => handleAnswerSelect(6,'Slytherin')}
                        />
                        <label className="form-check-label" htmlFor="q1_hufflepuff">
                            Cloak of Invisibility
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Hufflepuff"
                            name="exampleRadios6"
                            onChange={() => handleAnswerSelect(6,'Hufflepuff')}
                        />
                        <label className="form-check-label" htmlFor="q1_slytherin">
                            Other
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <p>Question 7: What is your preferred Quidditch position?</p>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Gryffindor"
                            name="exampleRadios7"
                            onChange={() => handleAnswerSelect(7,'Gryffindor')}
                        />
                        <label className="form-check-label" htmlFor="q1_gryffindor">
                            Seeker
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Ravenclaw"
                            name="exampleRadios7"
                            onChange={() => handleAnswerSelect(7,'Ravenclaw')}
                        />
                        <label className="form-check-label" htmlFor="q1_ravenclaw">
                            Chaser
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Hufflepuff"
                            name="exampleRadios7"
                            onChange={() => handleAnswerSelect(7,'Hufflepuff')}
                        />
                        <label className="form-check-label" htmlFor="q1_hufflepuff">
                            Keeper
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Slytherin"
                            name="exampleRadios7"
                            onChange={() => handleAnswerSelect(7,'Slytherin')}
                        />
                        <label className="form-check-label" htmlFor="q1_slytherin">
                            Beater
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <p>Question 8: If given a choice, where would you spend your free time at Hogwarts?</p>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Gryffindor"
                            name="exampleRadios8"
                            onChange={() => handleAnswerSelect(8,'Gryffindor')}
                        />
                        <label className="form-check-label" htmlFor="q1_gryffindor">
                            Gryffindor Common Room
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Ravenclaw"
                            name="exampleRadios8"
                            onChange={() => handleAnswerSelect(8,'Ravenclaw')}
                        />
                        <label className="form-check-label" htmlFor="q1_ravenclaw">
                            Ravenclaw Common Room
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Hufflepuff"
                            name="exampleRadios8"
                            onChange={() => handleAnswerSelect(8,'Hufflepuff')}
                        />
                        <label className="form-check-label" htmlFor="q1_hufflepuff">
                            Hufflepuff Common Room
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            type="radio"
                            className="form-check-input"
                            value="Slytherin"
                            name="exampleRadios8"
                            onChange={() => handleAnswerSelect(8,'Slytherin')}
                        />
                        <label className="form-check-label" htmlFor="q1_slytherin">
                            Slytherin Common Room   
                        </label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary me-3">Submit</button>
                <button className="btn btn-primary" onClick={handleReset}> Reset</button>
            </form>
        </div>
    );

}
