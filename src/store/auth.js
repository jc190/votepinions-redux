import axios from 'axios'

// ------------------------------------
// Constants
// ------------------------------------
export const IS_AUTHENTICATED = 'IS_AUTHENTICATED'

// ------------------------------------
// Actions
// ------------------------------------
export function setUser (user = {}) {
  return {
    type    : IS_AUTHENTICATED,
    payload : user
  }
}

// ------------------------------------
// Specialized Action Creator
// ------------------------------------
export const getUser = (dispatch) => {
  axios.get('/api/users')
    .then(function (response) {
      return dispatch(setUser(response.data))
    })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function authReducer (state = initialState, action) {
  return action.type === IS_AUTHENTICATED
    ? action.payload
    : state
}
