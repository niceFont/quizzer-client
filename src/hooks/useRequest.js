// https://github.com/ooade/use-fetch-hook/blob/master/src/hooks.js
// https://www.lowmess.com/blog/fetch-with-timeout/

import { useRef, useReducer, useEffect } from 'react';

// Fetch Data from the server with specified timeout
const fetchWithTimeout = (url, options = {}, time = 5000) => {
  const controller = new AbortController();
  const config = { ...options, signal: controller.signal };

  setTimeout(() => {
    controller.abort();
  }, time);

  return fetch(url, config)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response;
    })
    .catch((error) => {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out');
      }
      throw new Error(error.message);
    });
};

function useRequest(url, options) {
  // Cache Requests between reloads
  const cache = useRef({});

  const initialState = {
    status: 'idle',
    error: null,
    data: null,
  };
  // Different loading states for our request
  const [state, dispatch] = useReducer((currentState, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' };
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: action.payload };
      case 'ERROR':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return currentState;
    }
  }, initialState);

  useEffect(() => {
    if (!url) return undefined;
    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });
      // REVIEW doesnt work as intended, lets just keep it in and fix it later ;)
      if (cache.current[url]) {
        dispatch({ type: 'FETCHED', payload: cache.current[url] });
      } else {
        try {
          const response = await fetchWithTimeout(url, {
            ...options,
            mode: 'cors',
          });
          if (response.status === 204) {
            dispatch({ type: 'FETCHED', payload: null });
          } else {
            const data = await response.json();
            cache.current[url] = data;
            dispatch({ type: 'FETCHED', payload: data });
          }
        } catch (error) {
          dispatch({ type: 'ERROR', payload: error });
        }
      }
    };
    fetchData();
    return () => {};
  }, [url]);

  return state;
}

export default useRequest;
