import axios from "axios";
import {setAlert} from "./alert";

import {
    CLEAR_PROFILE,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILES,
    GET_REPOS
} from "./types";

//Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
    try {
        //when we login successfully, the token from the server will be set as the axios.default.header in utils.
        // So, after login to the dashboard. we can simplify call axis.get or post, no need to consider about the auth.
        const res = await axios.get("/api/profiles/me");
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

//Get all profiles
export const getProfiles = () => async (dispatch) => {
    dispatch({type: CLEAR_PROFILE})
    try {
        //when we login successfully, the token from the server will be set as the axios.default.header in utils.
        // So, after login to the dashboard. we can simplify call axis.get or post, no need to consider about the auth.
        const res = await axios.get("/api/profiles/");
        dispatch({
            type: GET_PROFILES,
            payload: res.data,
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

//Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profiles/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        console.log(err)
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

//Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profiles/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};

//Create or Update profile
export const createProfile = (formData, history, edit = false) => async (
    dispatch
) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const res = await axios.post("/api/profiles", formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

        if (!edit) {
            // which means create a new profile, redirect to the dashboard page
            history.push("/dashboard");
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
};


// Add Experience
export const addExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const res = await axios.put("/api/profiles/experience", formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert('Experience Added', "success"));

        history.push('./dashboard')
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
}

// Add Education
export const addEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const res = await axios.put("/api/profiles/education", formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert('Education Added', "success"));

        history.push('./dashboard')
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status,
            },
        });
    }
}

// Delete experience
export const deleteExperience = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profiles/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });

    }
}

// Delete education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profiles/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));

    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });

    }
}

//Delete account & profile
export const deleteAccount = id => async dispatch => {
    if (window.confirm('Are you sure? this can NOT be undone!')) {
        try {
            await axios.delete(`/api/profiles/`);
            dispatch({
                type: CLEAR_PROFILE,
            });
            dispatch({
                type: ACCOUNT_DELETED,
            });

            dispatch(setAlert('Your account has been permanently deleted'));

        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    }
}