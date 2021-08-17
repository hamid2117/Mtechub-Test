import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton,Button } from '@material-ui/core'

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
    padding: '40px 0px',
    marginLeft: '100px',
    
    maxWidth:"50%",
    "& p":{
     color:"white",
     fontSize:"12px",
    },
  },
  btn:{
    backgroundColor: '#F8B703',
    color: 'rgb(0, 7, 44)',
    '&:hover': {
      backgroundColor: '#F8B703',
    },
    fontSize: '12px',
  }
}))
const Hero = () => {
  const classes = useStyles()

  return (
    <>
      <header className={classes.main}>
        <div className={classes.head}>
          <h3 className={classes.heading}>
           Want to know the Cost of a Project?
          </h3>
          <p style={{maxWidth:"60%"}}>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro architecto, sed odit labore illo consequatur esse aut, veniam explicabo voluptatum perferendis fugit ab quas id earum sapiente perspiciatis quisquam omnis.
          </p>
        </div>
        <div style={{marginLeft:"100px"}}>
         <Button className={classes.btn}>Calculate Price</Button>
        </div>
      </header>
    </>
  )
}
export default Hero
