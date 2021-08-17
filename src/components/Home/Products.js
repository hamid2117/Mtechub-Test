import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Divider, Paper } from '@material-ui/core'
import { productData } from './dataa'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import StarIcon from '@material-ui/icons/Star'
import { useProductsContext } from './../../Context/products_context'

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
  },
  last: {
    margin: '40px auto',
  },
  lastBtn: {
    fontSize: '10px',
    backgroundColor: '#F8B703',
    '&:hover': {
      backgroundColor: '#F8B703',
    },
  },
  star: {
    color: '#F8B703',
  },
  detail: {
    backgroundColor: 'rgb(0, 7, 44)',
    color: '#F8B703',
    '&:hover': {
      backgroundColor: 'rgb(0, 7, 44)',
    },
    fontSize: '12px',
  },
  add: {
    backgroundColor: '#F8B703',
    color: 'rgb(0, 7, 44)',
    '&:hover': {
      backgroundColor: '#F8B703',
    },
    fontSize: '12px',
  },
  btnmain: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4px 15px',
    padding: '7px 3px',
  },
}))

const Products = () => {
  const classes = useStyles()
  const { allProducts, begin_Products, error_Products } = useProductsContext()
  return (
    <>
      <section style={{ height: '125vh' }}>
        <section className={classes.main}>
          <div className={classes.first}>
            <h2 className={classes.heading}>Products</h2>
            <Divider className={classes.divider} />
          </div>
          <div className={classes.mainChild}>
            {allProducts.map((data) => {
              const { id, heading, url } = data
              return (
                <Paper key={id}>
                  <Button style={{ display: 'grid' }}>
                    <div>
                      <img src={url} style={{ height: '160px' }} alt='img' />
                    </div>
                    <h4>{heading}</h4>
                    <div className={classes.star}>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>
                  </Button>
                  <div className={classes.btnmain}>
                    <Button className={classes.detail}>Details</Button>
                    <Button
                      className={classes.add}
                      startIcon={<ShoppingCartOutlinedIcon />}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Paper>
              )
            })}
          </div>
          <div className={classes.last}>
            <Button className={classes.lastBtn}>See all Products</Button>
          </div>
        </section>
      </section>
    </>
  )
}
export default Products
