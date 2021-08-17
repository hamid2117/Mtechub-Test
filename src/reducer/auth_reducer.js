import { AUTH_USER, LOGOUT, REGISTER } from '../action'

const auth_reducer = (state, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, userdata: action.payload }
    case LOGOUT:
      return { ...state, userdata: [] }
    case REGISTER:
      return { ...state }
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default auth_reducer
