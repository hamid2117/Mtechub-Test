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
    width: '500px',
  },
  btn: {
    marginRight: '10px',
  },
  midd: {
    marginTop: '50px',
  },
}))

const validationSchema = yup.object({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function DeleteModel({ model, closeModel, deleteUser }) {
  const classes = useStyles()

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={model}
        onClose={closeModel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={model}>
          <div className={classes.paper}>
            <h3>You really want to Delete Item </h3>
            <div className={classes.midd}>
              <Button
                className={classes.btn}
                variant='outlined'
                color='secondary'
                onClick={deleteUser}
              >
                Yes
              </Button>
              <Button variant='outlined' color='primary' onClick={closeModel}>
                No
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
