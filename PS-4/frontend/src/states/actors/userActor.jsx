import {
    USER_LOGGED_IN,
    USER_ABOUT
} from "../constants/userConstant.jsx"

export const userActor = (user) => async (dispatch) => {
    dispatch({
        type: USER_LOGGED_IN,
        payload: user
    })
}

export const getUser = (user) => async (dispatch) => {
    dispatch({
        type: USER_ABOUT,
        payload: user
    })
}