import React from 'react';
import { useState, useEffect } from 'react';

function App() {
  const [num, setNum] = useState(0);
  const [input1, setInput1] = useState([]);
  const [input2, setInput2] = useState([]);
  const [options, setOptions] = useState([]);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [seconds, setseconds] = useState(0);
  const [minutes, setminutes] = useState(0);

  const handleOption = (i) => {
    let inputs = [];
    for (let i = 0; i < 10; i++) {
      const newInput = Math.floor(Math.random() * 100 + 1);
      inputs.push(newInput);
    }
    const newOptions = (opt) => {
      return opt.sort(() => Math.random() - 0.5);
    };
    inputs.push(i);
    setOptions(newOptions(inputs));
  };

  useEffect(() => {
    handleOption();
  }, []);

  let a, b;
  const handleInput = (i) => {
    a = Math.floor(Math.random() * 100);
    b = Math.floor(Math.random() * (100 - 1));
    i = a + b;
    if (i > 100) {
      handleInput();
    } else {
      setInput1(a);
      setInput2(b);
      setNum(i);
      handleOption(i);
    }
  };

  useEffect(() => {
    handleInput();
  }, []);

  const handleClick = (i) => {
    if (i === num) {
      setScore(score + 1);
      handleInput();
    } else {
      setLives(lives - 1);
      if (lives === 1) {
        setGameover(true);
      }
    }
  };

  const asciihearts = () => {
    if (lives === 1) {
      return <div>&#10084;</div>;
    }
    if (lives === 2) {
      return <div>&#10084;&#10084;</div>;
    }
    if (lives === 3) {
      return <div>&#10084;&#10084;&#10084;</div>;
    }
  };

  function newGame() {
    window.location.reload();
    setLives(3);
    setOptions([]);
  }

  useEffect(() => {
    if (!gameover) {
      const timer = setTimeout(() => {
        setseconds(seconds + 1);
        if (seconds === 59) {
          setminutes(minutes + 1);
          setseconds(0);
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <div>
      {!gameover && (
        <div>
          <p style={{ float: 'left', padding: '20px' }}>
            {minutes} mins {seconds} secs{' '}
          </p>
          <div>
            <p style={{ float: 'right', padding: '20px' }}>{asciihearts()}</p>
          </div>
          <br />
          <br />
          <br />
          <div>
            <center>
              <p>
                {input1} + {input2} =
              </p>
            </center>
          </div>
          <div>
            {options.map((opt) => {
              return (
                <div style={{ display: 'inline-block', margin: '10px' }}>
                  <button onClick={() => handleClick(opt)}>{opt}</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {gameover && (
        <div>
          <p>
            Time taken: {minutes} mins {seconds} secs
          </p>
          <p>Score: {score}</p>
          <button onClick={newGame}>Start New Game</button>
        </div>
      )}
    </div>
  );
}
export default App;
