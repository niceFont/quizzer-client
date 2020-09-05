/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useRequest from '../hooks/useRequest';
import Tooltip from '../components/Tooltip';

const { API_URL } = process.env;

const Spinner = () => (
  <div className="flex flex-col justify-center items-center">
    <svg className="animate-spin h-12 w-12 mr-3" viewBox="0 0 24 24">
      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <span className="mt-5 font-semibold">Loading your awesome questions...</span>
  </div>
);

const ResultsTable = ({ results }) => (
  <table className="border-collapse w-full">
    <thead>
      <tr>
        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Question</th>
        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Your Answer</th>
        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Answer</th>
        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Correct</th>
      </tr>
    </thead>
    <tbody>
      {results.map((result) => (
        <tr key={result.question} className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
          <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Question</span>
            {result.question}
          </td>
          <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Your Answer</span>
            {result.entered}
          </td>
          <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Answer</span>
            {result.answer}
          </td>
          <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Correct</span>
            {result.correct
              ? <span className="rounded bg-green-400 py-1 px-3 text-xs font-bold">Correct</span>
              : <span className="rounded bg-red-400 py-1 px-3 text-xs font-bold">Incorrect</span>}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const ResultsBoard = ({ handleReset, id, userInput }) => {
  const response = useRequest(`${API_URL}/quiz/${id}/results`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ userAnswers: Object.values(userInput) }),
  });
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        opacity: { ease: 'easeInOut', duration: 1.5 },
      }}
      className="flex flex-col items-center"
    >
      {response.status === 'fetching' && <Spinner />}
      {response.status === 'error' && <FetchError error={response.error.message} />}
      {response.status === 'fetched' && !response.data && <QuizNotFound />}
      {response.status === 'fetched' && response.data.length
      && (
      <div className="flex flex-col items-center justify-center">
        <span className="mb-5">
          Well done, this is the result
        </span>
        <ResultsTable results={response.data} />
      </div>
      )}
      <button
        className="mt-6 transition h-10 rounded-lg px-5 transform duration-200 ease-in-out hover:bg-blue-400 hover:scale-110 text-white bg-blue-500 w-8/12 font-semibold"
        type="button"
        onClick={handleReset}
      >
        Try Again
      </button>
    </motion.div>
  );
};
const QuizCard = ({ question, handleInput, id }) => (
  <div className="flex rounded mx-auto items-center inset-0 bg-white text-black shadow-lg h-48 w-72 p-10 flex-col justify-center">
    <div className="mb-3 text-center">
      <span className="capitalize">{question.question}</span>
    </div>
    {question.type === 'choice'
      ? (
        <>
          {question.options.map((option) => (
            <div key={option}>
              <input onChange={(event) => handleInput(event, id)} className="form-radio mx-2 text-purple-600" name="question-options" id={option} type="radio" value={option} />
              <label htmlFor={option}>{option}</label>
            </div>
          ))}
        </>
      )
      : (
        <div>
          <textarea onChange={(event) => handleInput(event, id)} placeholder="Enter your anwer..." className="p-2 form-textarea border resize-none rounded-lg border-gray-500" name="answer-input" />
        </div>
      )}
  </div>
);

const QuizRenderer = ({ quiz }) => {
  const defaultInputState = quiz.questions
    .reduce((acc, question, index) => ({
      ...acc,
      [index + 1]: {
        id: question.id,
        userAnswer: null,
      },
    }), {});
  const [currentNum, setNum] = useState(1);
  const [userInput, setInput] = useState(defaultInputState);
  const handleReset = () => {
    setNum(1);
    setInput(defaultInputState);
  };
  const handleInput = (event, id) => {
    event.persist();
    setInput((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        userAnswer: event.target.value,
      },
    }));
  };
  const variants = {
    hidden: {
      position: 'absolute',
      opacity: 0,
      x: 200,
    },
    show: {
      position: 'absolute',
      opacity: 1,
      x: 0,
    },
    leave: {
      position: 'absolute',
      opacity: 0,
      x: -200,
    },
  };
  return (
    <div className="p-8 relative mx-auto w-144 items-center flex flex-col justify-center">
      <h1 className="mb-4 capitalize font-bold text-purple-800 text-4xl">{quiz.name}</h1>
      {quiz.description && <span className="text-gray-600 ">{quiz.description}</span>}
      <span className="border border-b-1 w-full my-4" />
      {currentNum <= quiz.questions.length && (
        <div className="my-4 text-center">
          <span className="text-purple-900 font-semibold">{`Question ${currentNum}/${quiz.questions.length}`}</span>
        </div>
      )}
      {currentNum > quiz.questions.length && (
      <ResultsBoard
        id={quiz.id}
        handleReset={handleReset}
        userInput={userInput}
      />
      )}
      <div className="h-48 w-full relative">
        <AnimatePresence>
          {currentNum <= quiz.questions.length && quiz.questions.map((item, index) => (
            <motion.div
              style={{ left: 0, right: 0 }}
              key={currentNum + item.question}
              variants={variants}
              initial="hidden"
              animate="show"
              exit="leave"
              transition={{
                x: { type: 'spring', stiffness: 100, damping: 10 },
                opacity: { duration: 0.2 },
              }}
            >
              {currentNum === index + 1 && (
              <QuizCard
                handleInput={handleInput}
                id={index + 1}
                question={item}
                key={item.question}
              />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {currentNum <= quiz.questions.length && (

      <button
        className="rounded-lg h-10 transition mx-2 transform duration-200 ease-in-out hover:bg-purple-600 hover:scale-105 text-white mt-8 bg-purple-800 font-semibold w-6/12"
        onClick={() => setNum((currentNum + 1))}
        type="button"
        disabled={!userInput[currentNum].userAnswer}
      >
        {currentNum !== quiz.questions.length ? 'Next' : 'Submit'}
      </button>
      )}
    </div>
  );
};

const QuizNotFound = () => (
  <div className="flex text-purple-800 flex-col justify-center items-center">
    <span className="font-extrabold text-6xl">404</span>
    <span>Sorry, we could not find what you were looking for...</span>
  </div>
);

const FetchError = () => (
  <div className="flex text-purple-800 flex-col justify-center items-center">
    <span className="font-extrabold text-6xl">Oops.</span>
    <span>There was an error while loading, please try again</span>
  </div>
);

const Quiz = () => {
  const { quizId } = useParams();
  const [tooltip, showTooltip] = useState(false);
  const handleCopy = useCallback(() => {
    showTooltip(true);
    setTimeout(showTooltip.bind(null, false), 500);
    const url = document.getElementById('shareInput');
    url.select();
    document.execCommand('copy');
  });
  const response = useRequest(`${API_URL}/quiz/${quizId}`);
  return (
    <div className="flex flex-col items-center justify-center">
      {response.status === 'fetching' && <Spinner />}
      {response.status === 'error' && <FetchError error={response.error.message} />}
      {response.status === 'fetched' && !response.data && <QuizNotFound />}
      {response.status === 'fetched' && response.data && <QuizRenderer quiz={response.data} />}
      <div className="mt-48 w-4/12 justify-center items-center flex flex-col">
        <span className="font-semibold">Share this quiz with somebody you know!</span>
        <div className="flex flex-row">
          <input readOnly id="shareInput" className="border-gray-300 h-8 border" type="text" name="shareUrl" value={`${window.location.host}/quiz/${quizId}`} />
          <div className="flex flex-col">
            {tooltip && <Tooltip>Copied!</Tooltip>}
            <button type="button" onClick={handleCopy} className="h-8 px-6 transition duration-300 ease-in-out transform hover:scale-105 bg-blue-600 hover:bg-blue-500 rounded text-white">Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
