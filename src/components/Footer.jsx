import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, Drawer, Button } from '@material-ui/core'
import logo from './../logo.png'
import { btns } from "./Home/dataa"
const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'start',
    gridAutoRows: '100px',
    width:"100%",
    maxWidth:"70%",
    margin:"0px auto",
    marginTop:"50px",
    height:"40vh",
    gap:"0px 70px",
    '@media (max-width: 800px)': {
    },
  },
  first:{
   width:"80%",
  },
  social:{
   display:"grid",
   maxWidth:"30%",
   margin:"20px auto",
   marginBottom:"40px",
   placeItems:"center",
   gridTemplateColumns:"1fr 1fr 1fr 1fr",
   
  },
}))
const Footer = () => {
  const classes = useStyles()
 
  return (
    <>
     <footer className={classes.main}>
      <div className={classes.first}>
       <div>
        <img src={logo} style={{height:"60px"}} alt="logo" />
       </div>
       <p>
        HTS software is providing services of selling building material and construction services and consultancy
       </p>
      </div>
      <div className={classes.second}>
       <h4>Resources</h4>
       <ul>
        {["Home","Contact","About us","Cart"].map((data,index)=>{
         return(
        <li style={{margin:"13px 0px"}} key={index}>{data}</li>
         )
        })}
       </ul>
      </div>
      
     </footer>
     <div className={classes.social}>
      {btns.map((data)=>{
         const {id ,Btn} = data
         return(
          <IconButton style={{color:"#F8B703"}} key={id} >
           {Btn}
         </IconButton>
         )
      })}
     
      </div>
    </>
  )
}
export default Footer
