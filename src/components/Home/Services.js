import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Divider } from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import { servicesdata } from './dataa'
const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid',
    width: '100%',
    maxWidth: '70%',
    margin: '20px auto',
    '@media (max-width: 500px)': {},
  },
  second: {
    justifyContent: 'center',
  },
  first: {
    margin: '14px 0px',
    marginBottom: '29px',
  },
  heading: {
    color: '#F8B703',
    textAlign: 'center',
  },
  divider: {
    width: '20%',
    margin: '2px auto',
    height: '2px',
    backgroundColor: '#F8B703',
  },
  child: {
    display: 'grid',
    placeItems: 'center',
    gap: '14px',
    textAlign: 'center',
  },
  mainChild: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',

    gap: '40px',
    '& p': {
      color: 'white',
    },
    '& h4': {
      color: 'white',
    },
    '& Button': {
      fontSize: '10px',
      backgroundColor: '#F8B703',
      '&:hover': {
        backgroundColor: 'white',
      },
    },
    '@media (max-width: 700px)': {
      gridTemplateColumns: '1fr ',
    },
  },
  last: {
    margin: '40px auto',
  },
  lastBtn: {
    fontSize: '10px',
    backgroundColor: '#F8B703',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
}))
const Services = () => {
  const classes = useStyles()

  return (
    <>
      <section style={{ backgroundColor: 'rgb(0, 8, 45)', height: '60vh' }}>
        <section className={classes.main}>
          <div className={classes.first}>
            <h2 className={classes.heading}>Services</h2>
            <Divider className={classes.divider} />
          </div>
          <div className={classes.mainChild}>
            {servicesdata.map((data) => {
              const { id, heading, desc } = data
              return (
                <div key={id} className={classes.child}>
                  <FavoriteBorderIcon style={{ color: '#F8B703' }} />
                  <h4>{heading}</h4>
                  <p>{desc}</p>
                  <Button variant='filled'>Detail</Button>
                </div>
              )
            })}
          </div>
          <div className={classes.last}>
            <Button className={classes.lastBtn}>See all Services</Button>
          </div>
        </section>
      </section>
    </>
  )
}
export default Services
