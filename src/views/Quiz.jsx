import React from 'react';
import { useParams } from 'react-router-dom';
import useRequest from '../hooks/useRequest';

const { API_URL } = process.env;

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

const QuizRenderer = ({ quiz }) => (
  <div className="p-8 mx-auto shadow-lg w-3/12 items-center flex flex-col justify-center">
    <h1 className="text-3xl">{quiz.name}</h1>
    {quiz.questions.map((item, index) => (
      <div className="flex flex-col justify-center" key={item.question}>
        <div className="my-4 text-center">
          <span className="font-semibold">{`Question ${index + 1}/${quiz.questions.length}`}</span>
        </div>
        <div className="mb-3 text-center">
          <span>{item.question}</span>
        </div>
        <div>
          <input className="border rounded-sm border-gray-500" type="text" />
        </div>
      </div>
    ))}
    <button className="text-white mt-8 bg-red-500 h-8 font-semibold w-full " type="button">Submit</button>
  </div>
);

const Quiz = () => {
  const { quizId } = useParams();
  const response = useRequest(`${API_URL}/quiz/${quizId}`);
  console.log(response);
  return (
    <div className="mt-24">
      {response.status === 'fetching' && <Spinner />}
      {response.status === 'error' && <span>{response.error.message}</span>}
      {response.status === 'fetched' && <QuizRenderer quiz={response.data} />}
    </div>
  );
};

export default Quiz;
