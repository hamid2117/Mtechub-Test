import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Drawer, Button } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import logo from './../logo.png'
import HomeIcon from '@material-ui/icons/Home'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    justifyContent: 'start',
    gridAutoRows: '100px',
    '@media (max-width: 800px)': {
      gridTemplateColumns: '2fr 1fr ',
    },
  },
  child: {
    display: 'grid',
    gridTemplateColumns: '20% 80%',
    gridAutoRows: '30px',
    marginTop: '50px',
    '& > p': {
      margin: '0px',
    },
  },
  sidebarheader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  },
}))
const Header = () => {
  const classes = useStyles()
  const matches = useMediaQuery('(max-width:800px)')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const closeSideBar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <header className={classes.main}>
        <div style={{ marginLeft: '15px', marginTop: '15px' }}>
          <img style={{ height: '80px' }} src={logo} alt='logo' />
        </div>
        {!matches ? (
          <>
            <div className={classes.child}>
              <HomeIcon style={{ color: '#F8B703' }} />
              <div>
                <p>phone</p>
                <p>03232323232323</p>
              </div>
            </div>
            <div className={classes.child}>
              <HomeIcon style={{ color: '#F8B703' }} />
              <div>
                <p>phone</p>
                <p>03232323232323</p>
              </div>
            </div>
          </>
        ) : (
          <div style={{ justifySelf: 'end', margin: 'auto 0px' }}>
            <IconButton onClick={() => setIsSidebarOpen(true)}>
              <MenuIcon />
            </IconButton>
          </div>
        )}
      </header>
      <Drawer
        open={isSidebarOpen}
        onClose={() => closeSideBar()}
        className={classes.Draw}
      >
        <div>
          <header className={classes.sidebarheader}>
            <div>
              <img style={{ height: '70px' }} src={logo} alt='logo' />
            </div>
            <div style={{ justifySelf: 'end', margin: ' auto 0px' }}>
              <IconButton onClick={() => closeSideBar()}>
                <CloseIcon />
              </IconButton>
            </div>
          </header>
          <div style={{ display: 'grid' }}>
            <Button
              startIcon={
                <HomeIcon style={{ marginRight: '10px', color: 'grey' }} />
              }
            >
              Home
            </Button>
            <Button
              startIcon={
                <HomeIcon style={{ marginRight: '10px', color: 'grey' }} />
              }
            >
              Home
            </Button>
            <Button
              startIcon={
                <HomeIcon style={{ marginRight: '10px', color: 'grey' }} />
              }
            >
              Home
            </Button>
          </div>
        </div>
      </Drawer>
    </>
  )
}
export default Header
