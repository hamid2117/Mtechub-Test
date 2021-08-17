import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  main: {
    '@media (max-width: 500px)': {},
    background:
      " url('https://hstconstruction.netlify.app/static/media/front.5cdee814.png') center/cover no-repeat fixed;",
    minHeight: '50vh',
  },
  heading: {
    color: 'white',
    fontSize: '32px',
  },
  head: {
    padding: '40px',
  },
}))
const Hero = () => {
  const classes = useStyles()

  return (
    <>
      <header className={classes.main}>
        <div className={classes.head}>
          <h3 className={classes.heading}>
            Welcome to <br /> Hst construction
          </h3>
        </div>
      </header>
    </>
  )
}
export default Hero
