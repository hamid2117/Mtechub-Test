import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: '60px',
    '@media (max-width: 500px)': {},
  },
  btn: {
    fontSize: '10px',
    marginBottom: '10px',
    backgroundColor: 'rgb(0, 7, 44)',
    color: 'white',
    '&:hover': {
      backgroundColor: '#F8B703',
    },
  },
}))
const Nav = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.main}>
        <Button
          variant='text'
          component={Link}
          to='dashboard'
          className={classes.btn}
        >
          User Dashboard
        </Button>
        <Button
          variant='text'
          component={Link}
          to='dashboardproduct'
          className={classes.btn}
        >
          Product Dashboard
        </Button>
      </div>
    </>
  )
}
export default Nav
