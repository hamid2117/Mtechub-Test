import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid ',
    width: '65%',
    gap: '10px',
    '@media (max-width: 500px)': {},
  },
}))

const validationSchema = yup.object({
  email: yup.string().email('Please enter a valid email address'),
})
const Formm = ({ config, id, setNewData }) => {
  const classes = useStyles()

  const onSubmit = async (value) => {
    const { ...data } = value
    try {
      const { data: dataa } = await axios.put(
        `http://localhost:5000/api/v1/user/${id}`,
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
      email: '',
      isAdmin: false,
    },
    onSubmit,
    validationSchema,
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={classes.main}>
        <TextField
          id='email'
          label='Email'
          variant='outlined'
          fullWidth
          error={formik.touched.email && formik.errors.email ? true : false}
          helperText={
            formik.touched.email && formik.errors.email
              ? formik.errors.email
              : null
          }
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name='email'
        />
        <InputLabel id='select-filled-label'>IsAdmin</InputLabel>
        <Select
          labelId='select-filled-label'
          id='isAdmin'
          name='isAdmin'
          value={formik.values.isAdmin}
          onChange={formik.handleChange}
        >
          <MenuItem value={false}>User</MenuItem>
          <MenuItem value={true}>Admin</MenuItem>
        </Select>
        <Button variant='outlined' color='primary' type='submit'>
          Edit
        </Button>
      </form>
    </>
  )
}
export default Formm
