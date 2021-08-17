import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import { useGlobalContext } from './../Context/uiContext'
import { useAuthContext } from './../Context/auth_context'
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr ',
    backgroundColor: '#F8B703',
    minHeight: '55px',
  },
  btnnav: {
    margin: 'auto 10px',
    marginTop: '8px',
    fontSize: '11px',
  },
  second: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
  input: {
    padding: '10px 10px',
    transition: 'all 2.5s ease',
  },
  inputDiv: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
  },

  btns: {
    justifySelf: 'end',
  },
}))

const Navbar = () => {
  const classes = useStyles()
  const [enterr, setEnterr] = useState(false)
  const { openLogin, openRegister } = useGlobalContext()
  const { userdata, logout } = useAuthContext()
  return (
    <>
      <section className={classes.main}>
        <div className={classes.first}>
          {['home', 'about us', 'Services', 'Products'].map((data, index) => {
            return (
              <Button
                key={index}
                style={index === 0 ? { borderBottom: '2px solid white' } : null}
                className={classes.btnnav}
              >
                {data}
              </Button>
            )
          })}
        </div>
        <div className={classes.second}>
          <div className={classes.btns} style={{ marginTop: '14px' }}>
            {!userdata.email ? (
              <>
                <Button
                  onClick={() => openRegister()}
                  style={{ marginLeft: '10px', fontSize: '10px' }}
                >
                  Register
                </Button>
                <Button
                  onClick={() => openLogin()}
                  style={{ marginRight: '10px', fontSize: '10px' }}
                >
                  Sign In
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => logout()}
                  style={{ marginRight: '10px', fontSize: '10px' }}
                >
                  Logout
                </Button>
                {userdata.isAdmin && (
                  <Button
                    component={Link}
                    to='/dashboard'
                    style={{ marginRight: '10px', fontSize: '10px' }}
                  >
                    Dashboard
                  </Button>
                )}
              </>
            )}
          </div>
          <div className={classes.inputDiv}>
            <div style={{ padding: '13px 0px' }}>
              <Button
                style={{
                  fontSize: '9px',
                  padding: '5px',
                  backgroundColor: 'rgb(0, 7, 44)',
                  color: 'white',
                }}
              >
                Price Calculater
              </Button>
            </div>
            {enterr ? (
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <IconButton
                        style={{ fontSize: '9px', padding: '5px' }}
                        onClick={() => setEnterr(false)}
                      >
                        <CloseIcon style={{ fontSize: '17px' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='start'>
                      <IconButton style={{ fontSize: '9px' }}>
                        <SearchIcon style={{ fontSize: '17px' }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                placeholder='Search Products...'
                className={classes.input}
              />
            ) : (
              <div>
                <IconButton
                  style={{ marginTop: '6px' }}
                  onMouseEnter={() => setEnterr(true)}
                >
                  <SearchIcon />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
export default Navbar
