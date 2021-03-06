import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useGlobalContext } from '../../Context/uiContext'
import CloseIcon from '@material-ui/icons/Close'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import MailIcon from '@material-ui/icons/MailOutline'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Button,
} from '@material-ui/core'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    borderRadius: '10px',
    padding: '30px 15px',
    width: '400px',
  },
  head: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'start',
  },
  inputs: {
    padding: '25px 0px',
    display: 'grid',
    gap: '15px 0px',
  },
  sign: {
    backgroundColor: '#F8B703',
    '&:hover': {
      backgroundColor: '#F8B710',
    },
  },
}))

const validationSchema = yup.object({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Please enter strong password')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .min(8, 'Please enter strong password')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('password')], 'Password does not matched'),
    })
    .required('Password is required'),
})

export default function Login() {
  const classes = useStyles()
  const { adminRegister, adminCloseRegister } = useGlobalContext()
  const [password, setPassword] = useState(false)
  const [emailerror, setEmailerror] = useState(false)

  const onSubmit = async (value) => {
    const { ...data } = value
    const response = await axios
      .post('http://localhost:5000/api/v1/register', data)
      .catch((e) => {
        if (e && e.response) {
          if (e.response.status === 409) {
            setEmailerror(true)
          }
        }
      })
    if (response && response.data) {
      adminCloseRegister()
      formik.resetForm()
    }
  }

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validateOnBlur: true,
    onSubmit,
    validationSchema,
  })

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={adminRegister}
        onClose={adminCloseRegister}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={adminRegister}>
          <div className={classes.paper}>
            <div className={classes.head}>
              <h3>Register</h3>
              <div style={{ justifySelf: 'end' }}>
                <IconButton onClick={() => adminCloseRegister()}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <form onSubmit={formik.handleSubmit} className={classes.inputs}>
              <TextField
                name='email'
                onBlur={formik.handleBlur}
                type='text'
                label='Email'
                error={
                  formik.touched.email && formik.errors.email
                    ? true
                    : false || emailerror
                    ? true
                    : false
                }
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null || emailerror
                    ? 'Email is already registered'
                    : null
                }
                value={formik.values.email}
                onChange={formik.handleChange}
                variant='standard'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton>
                        <MailIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type={password ? 'text' : 'password'}
                label='Password'
                name='password'
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false
                }
                helperText={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {password ? (
                        <IconButton onClick={() => setPassword(false)}>
                          <Visibility />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => setPassword(true)}>
                          <VisibilityOff />
                        </IconButton>
                      )}{' '}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name='confirmPassword'
                type='password'
                id='confirmPassword'
                label='Confirm Password'
                variant='standard'
                fullWidth
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                error={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? true
                    : false
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? formik.errors.confirmPassword
                    : null
                }
              />
              <Button className={classes.sign} type='submit'>
                add User
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
