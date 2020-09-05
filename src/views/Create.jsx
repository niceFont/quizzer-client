import React, { useState } from 'react';
import DropdownButton from '../components/DropdownButton';

const Create = () => {
  const [quizTitle, setTitle] = useState('New Quiz');
  const [currIndex, setCurrIndex] = useState(1);
  const [quiz, setQuiz] = useState({
    1: {
      question: '',
      answer: '',
      type: 'input',
    },
  });
  const [items, setItems] = useState(new Array(1));
  const handleInput = (event, index, key) => {
    event.persist();
    setQuiz((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [key]: event.target.value,
      },
    }));
  };
  const handleDelete = (key) => {
    setCurrIndex(currIndex - 1);
    setQuiz((prev) => {
      const newState = { ...prev };
      delete newState[key];
      return newState;
    });
  };
  const handlerAdd = (type) => {
    if (currIndex <= 25) {
      setCurrIndex(currIndex + 1);
      setQuiz((prev) => ({
        ...prev,
        [currIndex + 1]: {
          type,
          question: '',
          answer: '',
          options: type === 'choice' ? [] : undefined,
        },
      }));
    }
  };
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <span className="text-3xl">{quizTitle}</span>
      <span className="w-full mt-2 mb-8 border border-b-1" />
      <input onChange={(e) => setTitle(e.target.value)} className="form-input border rounded-lg h-10 mb-6 w-6/12" placeholder="Enter the quiz title..." type="text" />
      <textarea placeholder="Write a short description..." className="w-6/12 form-textarea border resize-none rounded-lg" />
      <span className="w-full mt-8 mb-4 border border-b-1" />
      <div className="w-full flex justify-end mb-8">
        <button type="button" onClick={() => setQuiz({})} className="px-8 py-2 rounded mx-2 text-white bg-red-500">Delete All</button>
        <DropdownButton title="Add Question">
          <div className="flex flex-col">
            <button onClick={() => handlerAdd('input')} className="w-full hover:bg-gray-100 h-8" type="button">Simple</button>
            <span className="w-full border border-b-1" />
            <button onClick={() => handlerAdd('choice')} className="w-full hover:bg-gray-100 h-8" type="button">Multiple Choice</button>
          </div>
        </DropdownButton>
      </div>
      {Object.entries(quiz).map(([key, value]) => (
        <div className="flex my-2 items-center flex-col" key={key}>
          <div className="flex items-center">
            <input
              onChange={(event) => handleInput(event, key, 'question')}
              className="mx-2 form-input border rounded-lg"
              placeholder="Enter the Question"
              type="text"
            />
            <input
              onChange={(event) => handleInput(event, key, 'answer')}
              className="mx-2 form-input border rounded-lg"
              placeholder="Enter the Answer"
              type="text"
            />
            <button onClick={() => handleDelete(key)} className=" text-red-500 mx-2 rounded-lg h-8 w-8" type="button">
              <svg className="svg-icon " viewBox="0 0 20 20">
                <path fill="currentColor" d="M12.71,7.291c-0.15-0.15-0.393-0.15-0.542,0L10,9.458L7.833,7.291c-0.15-0.15-0.392-0.15-0.542,0c-0.149,0.149-0.149,0.392,0,0.541L9.458,10l-2.168,2.167c-0.149,0.15-0.149,0.393,0,0.542c0.15,0.149,0.392,0.149,0.542,0L10,10.542l2.168,2.167c0.149,0.149,0.392,0.149,0.542,0c0.148-0.149,0.148-0.392,0-0.542L10.542,10l2.168-2.168C12.858,7.683,12.858,7.44,12.71,7.291z M10,1.188c-4.867,0-8.812,3.946-8.812,8.812c0,4.867,3.945,8.812,8.812,8.812s8.812-3.945,8.812-8.812C18.812,5.133,14.867,1.188,10,1.188z M10,18.046c-4.444,0-8.046-3.603-8.046-8.046c0-4.444,3.603-8.046,8.046-8.046c4.443,0,8.046,3.602,8.046,8.046C18.046,14.443,14.443,18.046,10,18.046z" />
              </svg>
            </button>
          </div>
          <span className="w-full mt-2 border border-b-1" />
          {value.type === 'choice' && (
          <div className="flex w-full flex-col items-center bg-gray-200 py-5">
            <div className="w-full flex justify-end">
              <button type="button" className="px-2 py-2 rounded mx-2 text-white bg-red-500">Add Option</button>
            </div>
            <div />
          </div>
          )}
        </div>
      ))}
      <button className=" bg-blue-600 text-white rounded-lg w-6/12 mt-24 h-10" type="button">Create</button>
    </div>
  );
};

export default Create;
