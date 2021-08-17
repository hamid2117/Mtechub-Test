import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from './../Context/auth_context'

const AdminRoute = ({ children, ...rest }) => {
  const { userdata } = useAuthContext()
  return (
    <Route
      {...rest}
      render={() => {
        return userdata.isAdmin ? children : <Redirect to='/' />
      }}
    ></Route>
  )
}

export default AdminRoute
