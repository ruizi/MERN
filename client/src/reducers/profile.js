import {GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE} from "../actions/types";

//firstly, define the initial state of this reduce
const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true, //one we make a request,this will be false
    error: {},
};

//Secondly, writing functions. This function use state and action as parameters
export default function (state = initialState, action) {
    const {type, payload} = action; //action is a object, contains type and payload.

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false,
            };
        default:
            return state;
    }
}
