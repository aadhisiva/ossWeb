// timeoutMiddleware.ts

import { Middleware } from 'redux';
import { userLoggedOut } from '../../redux/actions/userAction';
import { CLEAR_TIMEOUT_ID, LOGGED_IN, LOGGED_OUT, SET_TIMEOUT_ID } from '../constants';

const timeoutMiddleware: Middleware = ({ dispatch, getState }) => (next) => (action: any) => {

  if (action.type === LOGGED_IN) {
    // Set timeout for 30 minutes (30 * 60 * 1000 milliseconds)
    const timeoutId = setTimeout(() => {
      dispatch(userLoggedOut());
    }, 30 * 60 * 1000);

    // Save the timeoutId in the state
    dispatch({ type: SET_TIMEOUT_ID, payload: timeoutId });
  } else if (action.type === LOGGED_OUT) {
    // Clear the timeout when the user logs out
    const { timeoutId } = getState();
    clearTimeout(timeoutId);
    dispatch({ type: CLEAR_TIMEOUT_ID });
  }

  return next(action);
};

export default timeoutMiddleware;