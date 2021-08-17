import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import ProductList from './ProductList'
import { Link } from 'react-router-dom'
import { useAuthContext } from './../../../Context/auth_context'
import axios from 'axios'
import Nav from './../Nav'
const useStyles = makeStyles((theme) => ({
  main: {
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
  const [newId, setNewId] = useState('')
  const { userdata } = useAuthContext()
  const { token } = userdata
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const bodyParameters = {
    key: 'value',
  }
  const createNewProduct = async () => {
    try {
      const { data: dataa } = await axios.post(
        `http://localhost:5000/api/v1/createproduct`,
        bodyParameters,
        config
      )
      if (dataa) {
        setNewId(dataa._id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className={classes.main}>
      <Nav />
      <main>
        <div className={classes.heading}>
          <h2>Product Panel</h2>
          <div className={classes.btndiv}>
            <Button
              startIcon={<AddIcon />}
              onClick={() => createNewProduct()}
              component={Link}
              to={`/adminnewproduct/${newId}`}
              className={classes.btn}
            >
              Add New Product
            </Button>
          </div>
        </div>
        <ProductList />
      </main>
    </section>
  )
}
export default App
