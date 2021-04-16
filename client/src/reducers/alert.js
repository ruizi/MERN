import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload]; //return the new state with the new added alert
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload); //using the filter to remove the timeout alert from the states.
    default:
      return state;
  }
}
