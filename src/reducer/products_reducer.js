import {
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../action'

const product_reducer = (state, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BEGIN:
      return { ...state, begin_Products: true, error_Product: false }
    case GET_PRODUCTS_SUCCESS:
      return { ...state, begin_Products: false, allProducts: action.payload }
    case GET_PRODUCTS_ERROR:
      return { ...state, error_Products: true }
    case GET_SINGLE_PRODUCT_BEGIN:
      return { ...state, begin_Product: true, error_Product: false }
    case GET_SINGLE_PRODUCT_SUCCESS:
      return { ...state, begin_Product: false, singleProduct: action.payload }
    case GET_SINGLE_PRODUCT_ERROR:
      return { ...state, error_Product: true }
    default:
      throw new Error(`NO Matching ${action.type} -action.type`)
  }
}

export default product_reducer
