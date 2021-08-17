import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { rows } from './../../DummyData'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { useAuthContext } from './../../Context/auth_context'
import { Link, Redirect } from 'react-router-dom'
import { IconButton, Button } from '@material-ui/core'
import axios from 'axios'
import { useGlobalContext } from './../../Context/uiContext'
import DeleteModel from './DeleteModel'
const UserList = () => {
  const [data, setData] = useState(rows)
  const [loading, setLoading] = useState(true)
  const [redirect, setRedirect] = useState(false)
  const [model, setModel] = useState(false)
  const [deleteData, setDeleteData] = useState(false)
  const [newId, setNewId] = useState('')
  const { closeRegister } = useGlobalContext()
  const { userdata } = useAuthContext()
  const { token } = userdata

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const getData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        'http://localhost:5000/api/v1/users',
        config
      )
      if (data) {
        setLoading(false)
        setData(data)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setRedirect(true)
      }
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      const response = await axios.delete(
        `http://localhost:5000/api/v1/user/${id}`,
        config
      )
      if (response) {
        getData()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const closeModel = () => {
    setModel(false)
  }
  const deleteUser = () => {
    setDeleteData(true)
    setModel(false)
  }
  const handleDeleteBtn = (id) => {
    setNewId(id)
    setModel(true)
  }

  useEffect(() => {
    getData()
  }, [closeRegister])

  useEffect(() => {
    if (deleteData) {
      handleDelete(newId)
    }
  }, [deleteData])

  const columns = [
    { field: '_id', headerName: 'ID', width: 100 },
    { field: 'email', headerName: 'Email ', width: 230 },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      width: 170,
      renderCell: (params) => {
        return (
          <div className='userList'>
            {params.row.createdAt.substring(0, 10)}
          </div>
        )
      },
    },
    {
      field: 'isAdmin',
      headerName: 'Is Admin',
      description: 'This column has a value getter and is not sortable.',
      width: 150,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Button component={Link} to={`/adminuser/${params.row._id}`}>
              Edit
            </Button>
            <IconButton
              className='userListDelete'
              onClick={() => {
                // handleDelete(params.row._id)
                // setModel(true)
                handleDeleteBtn(params.row._id)
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </>
        )
      },
    },
  ]

  if (redirect) {
    return <Redirect to='/' />
  }

  return (
    <>
      {loading ? (
        <h2>Loading</h2>
      ) : (
        <DataGrid
          rows={data}
          disableSelectionOnClick
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      )}
      <DeleteModel
        model={model}
        closeModel={closeModel}
        deleteUser={deleteUser}
      />
    </>
  )
}

export default UserList
