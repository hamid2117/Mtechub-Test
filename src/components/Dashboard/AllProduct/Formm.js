import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, InputAdornment } from '@material-ui/core'
import { useFormik } from 'formik'
import { useAuthContext } from '../../../Context/auth_context'
import * as yup from 'yup'
import axios from 'axios'
import { useParams } from 'react-router-dom'

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
})

const NewFormP = ({ setNewData }) => {
  const classes = useStyles()
  const { id } = useParams()

  const { userdata } = useAuthContext()
  const { token } = userdata
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const onSubmit = async (value) => {
    const { ...data } = value
    try {
      const { data: dataa } = await axios.put(
        `http://localhost:5000/api/v1/updateproduct/${id}`,
        data,
        config
      )
      if (dataa) {
        setNewData(dataa)
        formik.resetForm()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      heading: '',
      url: '',
      price: '',
      desc: '',
    },
    onSubmit,
    validationSchema,
  })

  return (
    <main className={classes.main3}>
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
          name='price'
          label='Price'
          InputProps={{
            startAdornment: <InputAdornment>$</InputAdornment>,
          }}
          variant='outlined'
        />
        <TextField
          name='url'
          autoComplete='off'
          label='Image Url'
          variant='outlined'
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
          multiline
          rows={4}
          name='desc'
          label='desciption'
          style={{ gridColumn: '1 / span 2' }}
          variant='outlined'
        />

        <Button variant='outlined' color='primary' type='submit'>
          Update
        </Button>
      </form>
    </main>
  )
}
export default NewFormP
