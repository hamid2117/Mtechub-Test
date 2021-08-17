import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'center',
    gridAutoRows: '450px',
    '@media (max-width: 500px)': {},
  },
  second: {
    justifyContent: 'center',
  },
  first: {
    textAlign: 'justify',
    padding: '30px 170px',
    lineHeight: '1.80',
  },
}))
const About = () => {
  const classes = useStyles()

  return (
    <>
      <section className={classes.main}>
        <div className={classes.first}>
          <h2 style={{ textAlign: 'center' }}>About us </h2>
          <p>
            HST software is providing services of selling building material and
            construction services and consultancy. We will be building a web and
            mobile app for HTS which will help both the Customer and the
            organization in a better way through android app. We will build a
            system that provide all the necessary facilities like ordering
            different construction material online and delivering the money
            according to the order prize through online medium.
          </p>
        </div>
        <div className={classes.second}>
          <div style={{ padding: '30px 70px' }}>
            <img
              style={{ height: '380px' }}
              src={
                'https://hstconstruction.netlify.app/static/media/thump.b35d44d6.png'
              }
              alt='Image'
            />
          </div>
        </div>
      </section>
    </>
  )
}
export default About
