import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducer/auth_reducer'
import { AUTH_USER, LOGOUT } from '../action'

const getLocalStorage = () => {
  const userData = localStorage.getItem('userdata')
  if (userData) {
    return JSON.parse(userData)
  } else {
    return []
  }
}
const initialState = {
  userdata: getLocalStorage(),
}

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const loginData = (data) => {
    dispatch({ type: AUTH_USER, payload: data })
  }

  const logout = () => {
    localStorage.removeItem('userdata')
    dispatch({ type: LOGOUT })
  }

  useEffect(() => {
    localStorage.setItem('userdata', JSON.stringify(state.userdata))
  }, [state.userdata])

  return (
    <AuthContext.Provider value={{ ...state, loginData, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
// make sure use
export const useAuthContext = () => {
  return useContext(AuthContext)
}
