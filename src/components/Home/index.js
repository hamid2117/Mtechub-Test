import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Hero from './Hero'
import Services from './Services'
import About from './About'
import Products from './Products'
import Cost from './Cost'
import Login from '../Account/Login'
import Register from '../Account/Register'
const useStyles = makeStyles((theme) => ({
  main: {
    '@media (max-width: 500px)': {},
  },
}))
const Home = () => {
  const classes = useStyles()

  return (
    <>
      <main className={classes.main}>
        <Hero />
        <Login />
        <Register />
        <About />
        <Services />
        <Products />
        <Cost />
      </main>
    </>
  )
}
export default Home
