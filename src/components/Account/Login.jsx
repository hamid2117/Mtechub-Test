import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {useGlobalContext} from "../../Context/uiContext"
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MailIcon from '@material-ui/icons/MailOutline';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { IconButton,Divider,TextField,InputAdornment,Button } from '@material-ui/core';
import axios from "axios"
import {useAuthContext} from "./../../Context/auth_context"

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
    borderRadius:"10px",
    padding:"30px 15px",
    width:"400px",
  },
  head:{
    display:"grid",
    gridTemplateColumns:"1fr 1fr",
    justifyContent:"start",
  },
  inputs:{
    padding:"25px 0px",
    display:"grid",
    gap:"15px 0px"
  },
  sign:{
    backgroundColor:"#F8B703",
    "&:hover":{
    backgroundColor:"#F8B710",

    }
  }
}));

const validationSchema = yup.object({
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function Login() {
  const classes = useStyles();
  const {login,openRegister,closeLogin} = useGlobalContext()
  const { loginData } = useAuthContext()
  const [password, setPassword] = useState(false)
  const [emailerror, setEmailerror] = useState(false)
  const [passworderror, setPassworderror] = useState(false)

  const onSubmit = async (value) => {
    const { ...data } = value
    const response = await axios
      .post('http://localhost:5000/api/v1/login', data)
      .catch((e) => {
        if (e && e.response) {
          if (e.response.status === 404) {
            setEmailerror(true)
          }
          if (e.response.status === 403) {
            setEmailerror(false)
            setPassworderror(true)
          }
        }
      })
    if (response && response.data) {
      formik.resetForm()
      loginData(response.data)
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
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={login}
        onClose={closeLogin}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={login}>
          <div className={classes.paper}>
            <div className={classes.head}>
              <h3>Sign In</h3>
              <div style={{justifySelf:"end"}}>
              <IconButton onClick={()=> closeLogin()}>
              <CloseIcon /> 
              </IconButton>
              </div>
            </div>
            <Divider/>
            <form onSubmit={formik.handleSubmit} className={classes.inputs}>
              <TextField 
              name="email"
              onBlur={formik.handleBlur}
              type="text"
              label="Email"
              helperText={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null || (emailerror && 'This email address not registered')
              }
              error={
                formik.touched.email && formik.errors.email
                  ? true
                  : false || emailerror
                  ? true
                  : false
                }
                value={formik.values.email}
                onChange={formik.handleChange}
              variant="standard"
               InputProps={{
                endAdornment: <InputAdornment position="end">
                  <IconButton>
                  <MailIcon/>
                  </IconButton>
                  </InputAdornment>,
                }}
              />              
              <TextField 
                type={  password  ? "text":"password"}
                label="Password"
                name="password"
                onBlur={formik.handleBlur}
                value={formik.values.password}
                onChange={formik.handleChange}
                helperText={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null || (passworderror && 'Invalid password')
                }
                error={
                  formik.touched.password && formik.errors.password
                    ? true
                    : false || passworderror
                    ? true
                    : false
                }
                InputProps={{
                  endAdornment: <InputAdornment position="end"> 
                  {password ? (
                  <IconButton onClick={()=>setPassword(false)} >
                   <Visibility/>
                  </IconButton>
                   ):(
                   <IconButton onClick={()=>setPassword(true)}>
                     <VisibilityOff/>
                    </IconButton>
                     )
                  } </InputAdornment>,
                  }}
              />
            <Button className={classes.sign} type="submit">Sign in</Button>              
            </form>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1fr"}}>
              <h5 style={{marginTop:"10px"}}>Not Already Register ?</h5>
              <Button variant="outlined" color="primary" onClick={()=>openRegister()}>
                Register
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}