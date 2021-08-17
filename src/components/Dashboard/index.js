import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useGlobalContext } from './../../Context/uiContext'
import NewUser from './NewUser'
import Userlist from './Userlist'
import Nav from './Nav'

const useStyles = makeStyles((theme) => ({
  main: {},
  main2: {
    height: '80vh',
    width: '100%',
    maxWidth: '70%',
    margin: '0px auto',
    display: 'grid',
    gridTemplateColumns: '15% 85%',
    '@media (max-width: 500px)': {},
  },
  heading: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'start',
    '& h2': {
      color: '#F8B703',
    },
  },
  btn: {
    fontSize: '10px',
    backgroundColor: '#F8B703',
    '&:hover': {
      backgroundColor: '#F8B703',
    },
  },
  btndiv: {
    justifySelf: 'end',
    alignSelf: 'center',
  },
}))

const App = () => {
  const classes = useStyles()
  const { adminOpenRegister } = useGlobalContext()
  return (
    <section className={classes.main2}>
      <Nav />
      <main className={classes.main}>
        <div className={classes.heading}>
          <h2>User Panel</h2>
          <div className={classes.btndiv}>
            <Button
              startIcon={<AddIcon />}
              onClick={adminOpenRegister}
              className={classes.btn}
            >
              Add new user
            </Button>
          </div>
          <NewUser />
        </div>
        <Userlist />
      </main>
    </section>
  )
}
export default App
