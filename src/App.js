import './App.css';
import axios from 'axios'
import { useEffect, useState } from 'react';

function App() {
  const [level, setlevel] = useState("")
  const [words, setwords] = useState(null)
  const [correct, setcorrect] = useState([])
  const [clicked, setclicked] = useState([])
  const [score, setscore] = useState(0)

  const getwords = () => {
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/result',
      params: { level: level, area: 'sat' },
      headers: {
        'X-RapidAPI-Host': 'twinword-word-association-quiz.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
      }
    };

    axios.request(options).then((response) => {
      console.log(response.data);
      setwords(response.data)
    }).catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    if (level) {
      getwords();
    }
    // eslint-disable-next-line
  }, [level])

  const checkans = (op, optionindex, correctans) => {
    if (optionindex === correctans) {
      setcorrect([...correct, op])
      setscore((score) => score + 1)
    } else {
      setscore((score) => score - 1)
    }
    setclicked([...clicked, op])
  }
  return (
    <div className="App">
      {!level && (
        <div className="levelselect">
          <h1>Word Quiz</h1>
          <p>Select Level To Start</p>
          <select name="levels" id="levels" value={level} onChange={(e) => setlevel(e.target.value)}>
            <option value="">Select Level</option>
            <option value='1'>Level-1</option>
            <option value='2'>Level-2</option>
            <option value='3'>Level-3</option>
            <option value='4'>Level-4</option>
            <option value='5'>Level-5</option>
            <option value='6'>Level-6</option>
            <option value='7'>Level-7</option>
            <option value='8'>Level-8</option>
            <option value='3'>Level-9</option>
            <option value='10'>Level-10</option>
          </select>
        </div>
      )}
      {level && (
        <div className="questionarea">
          <h1>Welcome To Level : {level}</h1>
          <h3>Your Score is : {score}</h3>
          <div className="questions">
            {words && words.quizlist.map((question, quesindex) => (
              <div className='card' key={quesindex}>
                {question.quiz.map((ques, _index) => (
                  <p key={_index} className="p">{ques}</p>
                ))}
                <div className="questbtns">
                  {question && question.option.map((op, optionindex) => (
                    <div className='questbtn'>
                      <button disabled={clicked.includes(op)} onClick={() => checkans(op, optionindex + 1, question.correct)}>{op}</button>
                      {correct.includes(op) && (
                        <p>Correct!</p>
                        )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={()=>setlevel(null)} className="btn">Go Back!</button>
        </div>
      )}
    </div>
  );
}

export default App;
