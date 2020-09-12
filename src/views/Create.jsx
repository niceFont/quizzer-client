import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DropdownButton from '../components/DropdownButton';
import useRequest from '../hooks/useRequest';
import Spinner from '../components/Spinner';
import NotFound from '../components/NotFound';
import FetchError from '../components/FetchError';
import UrlCopy from '../components/UrlCopy';
import Alert from '../components/Alert';

const { API_URL } = process.env;

// TODO prop validation may not be a bad idea
const SubmitView = ({ quizObject, questionsObject, handleBack }) => {
  const format = (questions) => [...Object.values(questions)].map((question) => {
    // eslint-disable-next-line no-param-reassign
    delete question.currOptionIndex;
    // eslint-disable-next-line no-param-reassign
    if (question.options === null) delete question.options;
    if (question.type === 'choice') {
      return {
        ...question,
        options: Object.values(question.options).map((item) => item.option),
      };
    }
    return question;
  });
  const response = useRequest(`${API_URL}/quiz/create`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ ...quizObject, questions: format(questionsObject) }),
  });
  return (
    <div className="w-full flex items-center justify-center">
      {response.status === 'fetching' && <Spinner>Creating your Quiz...</Spinner>}
      {response.status === 'error' && (
      <div>
        <FetchError />
        <div className="w-full flex items-center justify-center">
          <button onClick={handleBack} className="mt-10 text-purple-600 border py-2 px-2 rounded-md inline-flex items-center" type="button">
            <svg className="svg-icon w-5 mr-4" viewBox="0 0 20 20">
              <path fill="currentColor" d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
      )}
      {response.status === 'fetched' && !response.data && <NotFound />}
      {response.status === 'fetched' && response.data && (
        <div className="w-full flex items-center justify-center flex-col">
          <span className="text-2xl mb-6 font-bold">Congratulations, your Quiz was successfully created</span>
          <div className=" w-10">
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path d="M10.219,1.688c-4.471,0-8.094,3.623-8.094,8.094s3.623,8.094,8.094,8.094s8.094-3.623,8.094-8.094S14.689,1.688,10.219,1.688 M10.219,17.022c-3.994,0-7.242-3.247-7.242-7.241c0-3.994,3.248-7.242,7.242-7.242c3.994,0,7.241,3.248,7.241,7.242C17.46,13.775,14.213,17.022,10.219,17.022 M15.099,7.03c-0.167-0.167-0.438-0.167-0.604,0.002L9.062,12.48l-2.269-2.277c-0.166-0.167-0.437-0.167-0.603,0c-0.166,0.166-0.168,0.437-0.002,0.603l2.573,2.578c0.079,0.08,0.188,0.125,0.3,0.125s0.222-0.045,0.303-0.125l5.736-5.751C15.268,7.466,15.265,7.196,15.099,7.03" />
            </svg>
          </div>
          <UrlCopy className="mt-12" url={`${window.location.host}/quiz/${response.data.quizID}`} />
        </div>
      )}
    </div>
  );
};

const Create = () => {
  const [quizTitle, setTitle] = useState('New Quiz');
  const [quizDescr, setDescr] = useState('');
  const [currIndex, setCurrIndex] = useState(1);
  const [submitted, toggleSubmit] = useState(false);
  const {
    register, handleSubmit, errors,
  } = useForm();
  const [quiz, setQuiz] = useState({
    1: {
      question: '',
      answer: '',
      type: 'input',
    },
  });
  const handleBack = () => {
    toggleSubmit(false);
  };
  const handleAddOption = (parentKey) => {
    if (Object.keys(quiz[parentKey].options).length < 8) {
      setCurrIndex(currIndex + 1);
      setQuiz((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          currOptionIndex: prev[parentKey].currOptionIndex + 1,
          options: {
            ...prev[parentKey].options,
            [prev[parentKey].currOptionIndex]: {
              option: '',
            },
          },
        },
      }));
    }
  };
  const handleOptionInput = (event, parentIndex, childKey) => {
    event.persist();
    setQuiz((prev) => ({
      ...prev,
      [parentIndex]: {
        ...prev[parentIndex],
        options: {
          ...prev[parentIndex].options,
          [childKey]: {
            option: event.target.value,
          },
        },
      },
    }));
  };
  const handleDeleteOption = (parentKey, childKey) => {
    setQuiz((prev) => {
      const newState = { ...prev };
      delete newState[parentKey].options[childKey];
      return newState;
    });
  };
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
  const handleAdd = (type) => {
    if (Object.keys(quiz).length < 25) {
      setCurrIndex(currIndex + 1);
      setQuiz((prev) => ({
        ...prev,
        [currIndex + 1]: {
          type,
          question: '',
          answer: '',
          currOptionIndex: 1,
          options: type === 'choice' ? [] : undefined,
        },
      }));
    }
  };
  // TODO show an overview of the created quiz
  return (
    <>
      {submitted ? (
        <SubmitView
          handleBack={handleBack}
          quizObject={{ name: quizTitle, description: quizDescr }}
          questionsObject={quiz}
        />
      )
        : (
          <form onSubmit={handleSubmit(() => toggleSubmit(true))} className="flex flex-col w-full items-center justify-center">
            {!!Object.keys(errors).length
            && (
            <Alert>
              Oops, seems like you did not complete all the necessary steps
              {' '}
              <span role="img" aria-label="alert-emoji">😳</span>
            </Alert>
            )}
            <span className="text-3xl">{quizTitle}</span>
            <span className="w-full mt-2 mb-8 border border-b-1" />
            <input
              ref={register({
                required: true,
                maxLength: 144,
              })}
              name="quiz-title"
              onChange={(e) => setTitle(e.target.value)}
              className="form-input border rounded-lg h-10 mb-6 w-9/12 md:w-8/12 lg:w-6/12"
              placeholder="Enter the quiz title..."
              type="text"
            />
            <textarea
              name="quiz-descr"
              ref={register({
                required: false,
                maxLength: 250,
              })}
              onChange={(e) => setDescr(e.target.value)}
              placeholder="Write a short description..."
              className="w-9/12 md:w-8/12 lg:w-6/12 form-textarea border resize-none rounded-lg"
            />
            <span className="w-full mt-8 mb-4 border border-b-1" />
            <div className="w-full flex justify-end mb-8">
              <DropdownButton title="Add Question">
                <div className="flex flex-col">
                  <button onClick={() => handleAdd('input')} className="w-full bg-white hover:bg-gray-100 h-8" type="button">Simple</button>
                  <span className="w-full border border-b-1" />
                  <button onClick={() => handleAdd('choice')} className="w-full bg-white hover:bg-gray-100 h-8" type="button">Multiple Choice</button>
                </div>
              </DropdownButton>
              <button
                type="button"
                onClick={() => setQuiz({})}
                className="hover:bg-red-400 transition duration-300 ease-in-out px-8 py-2 rounded-md mx-2 leading-5 text-white bg-red-500"
              >
                Delete All

              </button>
            </div>
            {Object.entries(quiz).map(([key, value]) => (
              <div className="flex my-2 items-center flex-col" key={key}>
                <div className="flex flex-col-reverse shadow-md rounded-md lg:shadow-none p-6 lg:p-2 lg:flex-row items-center ">
                  <input
                    name={`question-${key}`}
                    onChange={(event) => handleInput(event, key, 'question')}
                    ref={register({
                      required: true,
                      maxLength: 144,
                    })}
                    className="mx-2 my-2 lg:my-0 form-input border rounded-lg"
                    placeholder="Enter the Question"
                    type="text"
                  />
                  {/* TODO Make answer a selectable field for multiple choice questions */}
                  <input
                    name={`answer-${key}`}
                    ref={register({
                      required: true,
                      maxLength: 144,
                    })}
                    onChange={(event) => handleInput(event, key, 'answer')}
                    className="mx-2 form-input border rounded-lg"
                    placeholder="Enter the Answer"
                    type="text"
                  />
                  <div className="w-full lg:w-12 flex items-end justify-end mb-4 lg:mb-0">
                    <button onClick={() => handleDelete(key)} className="transition duration-300 transform ease-in-out hover:scale-125 text-red-500 mx-2 rounded-lg h-8 w-8" type="button">
                      <svg className="svg-icon " viewBox="0 0 20 20">
                        <path fill="currentColor" d="M12.71,7.291c-0.15-0.15-0.393-0.15-0.542,0L10,9.458L7.833,7.291c-0.15-0.15-0.392-0.15-0.542,0c-0.149,0.149-0.149,0.392,0,0.541L9.458,10l-2.168,2.167c-0.149,0.15-0.149,0.393,0,0.542c0.15,0.149,0.392,0.149,0.542,0L10,10.542l2.168,2.167c0.149,0.149,0.392,0.149,0.542,0c0.148-0.149,0.148-0.392,0-0.542L10.542,10l2.168-2.168C12.858,7.683,12.858,7.44,12.71,7.291z M10,1.188c-4.867,0-8.812,3.946-8.812,8.812c0,4.867,3.945,8.812,8.812,8.812s8.812-3.945,8.812-8.812C18.812,5.133,14.867,1.188,10,1.188z M10,18.046c-4.444,0-8.046-3.603-8.046-8.046c0-4.444,3.603-8.046,8.046-8.046c4.443,0,8.046,3.602,8.046,8.046C18.046,14.443,14.443,18.046,10,18.046z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <span className="w-full mt-2 border border-b-1" />
                {value.type === 'choice' && (
                <div className="flex w-full md:flex-row flex-col items-center bg-gray-200 py-5">
                  <div className="w-full flex flex-col">
                    <div className="w-full flex justify-end">
                      <button onClick={() => handleAddOption(key)} type="button" className="transition duration-300 ease-in-out hover:bg-gray-100 border hover:text-gray leading-5 px-2 py-2 rounded mx-2 bg-white">Add Option</button>
                    </div>
                    <div className="w-full max-w-3xl flex flex-wrap flex-col lg:flex-row">
                      {Object.entries(quiz[key].options).map(([childKey]) => (
                        <div className="flex my-2 items-center" key={childKey}>
                          <input
                            name={`option-${key}-${childKey}`}
                            ref={register({
                              required: true,
                              maxLength: 60,
                            })}
                            onChange={(event) => handleOptionInput(event, key, childKey)}
                            className="mx-2 form-input border rounded-lg"
                            placeholder="Enter an Option"
                            type="text"
                          />
                          <button onClick={() => handleDeleteOption(key, childKey)} className="transition duration-300 transform ease-in-out hover:scale-125 text-red-500 mx-2 rounded-lg h-8 w-8" type="button">
                            <svg className="svg-icon " viewBox="0 0 20 20">
                              <path fill="currentColor" d="M12.71,7.291c-0.15-0.15-0.393-0.15-0.542,0L10,9.458L7.833,7.291c-0.15-0.15-0.392-0.15-0.542,0c-0.149,0.149-0.149,0.392,0,0.541L9.458,10l-2.168,2.167c-0.149,0.15-0.149,0.393,0,0.542c0.15,0.149,0.392,0.149,0.542,0L10,10.542l2.168,2.167c0.149,0.149,0.392,0.149,0.542,0c0.148-0.149,0.148-0.392,0-0.542L10.542,10l2.168-2.168C12.858,7.683,12.858,7.44,12.71,7.291z M10,1.188c-4.867,0-8.812,3.946-8.812,8.812c0,4.867,3.945,8.812,8.812,8.812s8.812-3.945,8.812-8.812C18.812,5.133,14.867,1.188,10,1.188z M10,18.046c-4.444,0-8.046-3.603-8.046-8.046c0-4.444,3.603-8.046,8.046-8.046c4.443,0,8.046,3.602,8.046,8.046C18.046,14.443,14.443,18.046,10,18.046z" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div />
                </div>
                )}
              </div>
            ))}
            <input type="submit" className="cursor-pointer transition duration-300 transform ease-in-out hover:scale-105 bg-purple-700 hover:bg-purple-600 uppercase text-white rounded-lg  w-9/12 md:w-8/12 lg:w-6/12 mt-24 h-10 font-bold" />
          </form>
        )}
    </>
  );
};

export default Create;
