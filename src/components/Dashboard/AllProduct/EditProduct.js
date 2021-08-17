import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  CalendarToday,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from '@material-ui/icons'
import axios from 'axios'
import { useAuthContext } from './../../../Context/auth_context'
import Formm from './Formm'

// or
const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    maxWidth: '70%',
    margin: '0px auto',
  },
  main2: {
    width: '100%',
    maxWidth: '70%',
    height: '70vh',
    margin: '0px auto',
    display: 'grid',
    gap: '15px',
    gridTemplateColumns: '30% 70%',
  },
}))

const User = () => {
  const classes = useStyles()
  const { id } = useParams()
  const [newData, setNewData] = useState({})
  const { userdata } = useAuthContext()
  const { token } = userdata
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/products/${id}`,
        config
      )
      if (data) {
        setNewData(data)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // setRedirect(true)
      }
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className={classes.main}>
        <h1>Edit Product</h1>
      </div>
      <div className={classes.main2}>
        <div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Product </span>
            <div>
              <PermIdentity />
              <span style={{ marginLeft: '10px' }}>
                {newData && newData._id}
              </span>
            </div>
            <div>
              <CalendarToday />
              <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                {newData && newData.createdAt}
              </span>
            </div>
            <div style={{ margin: '20px 0px' }}>
              <span style={{ fontWeight: 'bold' }}>Product Detail</span>
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Name : </span>
              <span>{newData && newData.heading}</span>
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Price : </span>
              <span>{newData && newData.price} Rs</span>
            </div>
            <div>
              <span>{newData && newData.desc}</span>
            </div>
            <span style={{ fontWeight: 'bold' }}>Image : </span>
            <div>
              <span style={{ marginLeft: '40px' }}>
                <img
                  style={{
                    height: '90px',
                    borderRadius: '10px',
                    border: '1px solid yellow',
                  }}
                  src={newData && newData.url}
                  alt='Pic'
                />
              </span>
            </div>
          </div>
        </div>
        <div>
          <Formm config={config} id={id} setNewData={setNewData} />
        </div>
      </div>
    </>
  )
}

export default User
