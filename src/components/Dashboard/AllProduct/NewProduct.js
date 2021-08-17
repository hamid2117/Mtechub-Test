import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, InputAdornment } from '@material-ui/core'
import { useFormik } from 'formik'
import { Redirect } from 'react-router-dom'
import { useAuthContext } from '../../../Context/auth_context'
import * as yup from 'yup'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid ',
    gridTemplateColumns: '1fr 1fr',
    width: '90%',
    gap: '10px 15px',
    '@media (max-width: 500px)': {},
  },
  main3: {
    height: '70vh',
    width: '100%',
    maxWidth: '80%',
    margin: '0px auto',
  },
  main2: {
    margin: '50px 10px',
  },
}))

const validationSchema = yup.object({
  heading: yup.string().min(3, 'Please enter your real Name'),
  // url: yup
  //   .string()
  //   .matches(
  //     /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
  //     'Enter correct url!'
  //   )
  //   .required('Please enter valid url'),
})

const NewFormP = () => {
  const classes = useStyles()
  const pageRender = 'sdfasdf'
  const [redirect, setRedirect] = useState(false)
  const [newId, setNewId] = useState('')
  const { userdata } = useAuthContext()
  const { token } = userdata
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const bodyParameters = {
    key: 'value',
  }
  const onSubmit = async (value) => {
    const { ...data } = value
    try {
      const { data: dataa } = await axios.put(
        `http://localhost:5000/api/v1/updateproduct/${newId}`,
        data,
        config
      )
      if (dataa) {
        setRedirect(true)
        formik.resetForm()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const createNewProduct = async () => {
    try {
      const { data: dataa } = await axios.post(
        `http://localhost:5000/api/v1/createproduct`,
        bodyParameters,
        config
      )
      if (dataa) {
        setNewId(dataa._id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    createNewProduct()
  }, [pageRender])

  const formik = useFormik({
    initialValues: {
      heading: 'sample name',
      url: 'https://static9.depositphotos.com/1431107/1154/i/600/depositphotos_11542091-stock-photo-sample-stamp.jpg',
      price: 0,
      desc: 'Sample Product description ......',
    },
    onSubmit,
    validationSchema,
  })
  if (redirect) {
    setTimeout(() => {
      setRedirect(false)
    }, 1000)
    return <Redirect to='/dashboardproduct' />
  }
  return (
    <main className={classes.main3}>
      <div className={classes.main2}>
        <h2>Create A new Product</h2>
      </div>
      <form onSubmit={formik.handleSubmit} className={classes.main}>
        <TextField
          id='heading'
          name='heading'
          label='Name'
          variant='outlined'
          error={formik.touched.heading && formik.errors.heading ? true : false}
          helperText={
            formik.touched.heading && formik.errors.heading
              ? formik.errors.heading
              : null
          }
          value={formik.values.heading}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
        />
        <TextField
          value={formik.values.price}
          onChange={formik.handleChange}
          id='price'
          type='number'
          onBlur={formik.handleBlur}
          error={formik.touched.price && formik.errors.price ? true : false}
          helperText={
            formik.touched.price && formik.errors.price
              ? formik.errors.price
              : null
          }
          name='price'
          label='Price'
          InputProps={{
            startAdornment: <InputAdornment>$</InputAdornment>,
          }}
          variant='outlined'
        />
        <TextField
          id='url'
          name='url'
          label='Image Url'
          variant='outlined'
          autoComplete='off'
          error={formik.touched.url && formik.errors.url ? true : false}
          helperText={
            formik.touched.url && formik.errors.url ? formik.errors.url : null
          }
          value={formik.values.url}
          onChange={formik.handleChange}
          style={{ gridColumn: '1 / span 2' }}
          onBlur={formik.handleBlur}
          fullWidth
        />

        <TextField
          value={formik.values.desc}
          onChange={formik.handleChange}
          id='desc'
          onBlur={formik.handleBlur}
          error={formik.touched.desc && formik.errors.desc ? true : false}
          helperText={
            formik.touched.desc && formik.errors.desc
              ? formik.errors.desc
              : null
          }
          multiline
          rows={4}
          name='desc'
          label='desc'
          style={{ gridColumn: '1 / span 2' }}
          variant='outlined'
        />

        <Button variant='outlined' color='primary' type='submit'>
          Create
        </Button>
      </form>
    </main>
  )
}
export default NewFormP
