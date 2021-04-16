import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid(); //generate a uuid for the new alert action.
  dispatch({
    //dispatch this new action to the reducer.
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  //make the alert disappear by setting a timeout
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
