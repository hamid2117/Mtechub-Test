import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuthContext } from './../Context/auth_context'
const UiContext = createContext()

export const UiProvider = ({ children }) => {
  const { userdata } = useAuthContext()
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)
  const [adminRegister, setAdminRegister] = useState(false)
  const [adminEdit, setAdminEdit] = useState('')

  const closeLogin = () => {
    setLogin(false)
  }
  const openLogin = () => {
    setLogin(true)
    setRegister(false)
  }
  const closeRegister = () => {
    setRegister(false)
  }
  const openRegister = () => {
    setRegister(true)
    setLogin(false)
  }
  const adminCloseRegister = () => {
    setAdminRegister(false)
  }
  const adminOpenRegister = () => {
    setAdminRegister(true)
  }
  const adminCloseEdit = () => {
    setAdminEdit(false)
  }
  const adminOpenEdit = (id) => {
    console.log(id)
    setAdminEdit(id)
  }
  useEffect(() => {
    if (userdata.email) {
      closeRegister()
      closeLogin()
    }
  }, [userdata])

  return (
    <UiContext.Provider
      value={{
        login,
        register,
        closeLogin,
        adminRegister,
        openLogin,
        adminEdit,
        adminCloseEdit,
        adminOpenEdit,
        closeRegister,
        adminOpenRegister,
        adminCloseRegister,
        openRegister,
      }}
    >
      {children}
    </UiContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(UiContext)
}
