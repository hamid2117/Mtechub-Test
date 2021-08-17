import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Home, Error, Dashboard } from './Pages'
import EditUser from './components/Dashboard/EditUser/EditUser'
import EditProduct from './components/Dashboard/AllProduct/EditProduct'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Product from './components/Dashboard/AllProduct/index'
import NewProduct from './components/Dashboard/AllProduct/NewProduct'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import AdminRoute from './utils/AdminRoute'

const useStyles = makeStyles((theme) => ({
  main: {
    '@media (max-width: 500px)': {},
  },
}))
const App = () => {
  const classes = useStyles()
  const matches = useMediaQuery('(max-width:800px)')

  return (
    <>
      <main className={classes.main}>
        <Router>
          <Header />
          {!matches && <Navbar />}
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <AdminRoute exact path='/dashboard'>
              <Dashboard />
            </AdminRoute>
            <AdminRoute exact path='/dashboardproduct'>
              <Product />
            </AdminRoute>
            <AdminRoute exact path='/adminnewproduct'>
              <NewProduct />
            </AdminRoute>
            <AdminRoute exact path='/adminuser/:id' component={EditUser} />
            <AdminRoute
              exact
              path='/adminproduct/:id'
              component={EditProduct}
            />
            <Route path='*'>
              <Error />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </main>
    </>
  )
}
export default App
