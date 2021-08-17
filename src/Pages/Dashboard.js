import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dashboard from './../components/Dashboard'
import { Helmet } from 'react-helmet'

const useStyles = makeStyles((theme) => ({
  main: {
    '@media (max-width: 500px)': {},
  },
}))
const App = () => {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>HST | Welcome</title>
      </Helmet>
      <main className={classes.main}>
        <Dashboard />
      </main>
    </>
  )
}
export default App
