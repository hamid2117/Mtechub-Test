import React, { useReducer, useContext, createContext, useEffect } from 'react'
import axios from 'axios'

import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../action'
import reducer from './../reducer/products_reducer'

const productsContext = createContext()

const initialState = {
  allProducts: [],
  begin_Products: false,
  error_Products: false,
  singleProduct: [],
  begin_Product: false,
  error_Product: false,
}

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchData = async () => {
    try {
      dispatch({ type: GET_PRODUCTS_BEGIN })
      const { data } = await axios.get('http://localhost:5000/api/v1/products')
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  const fetchSingleData = async (id) => {
    try {
      dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/products/${id}`
      )
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <productsContext.Provider value={{ ...state, fetchSingleData }}>
      {children}
    </productsContext.Provider>
  )
}

export const useProductsContext = () => {
  return useContext(productsContext)
}
