import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  main: {
    height: '80vh',
    display: 'grid',
    placeItems: 'center',
    textAlign: 'center',
    '@media (max-width: 500px)': {},
  },
}))
const App = () => {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>HST | 404</title>
      </Helmet>
      <main>
        <div className={classes.main}>
          <h2>Page is not Fount</h2>
          <Button component={Link} to='/' variant='contained' color='secondary'>
            Return Home
          </Button>
        </div>
      </main>
    </>
  )
}
export default App
