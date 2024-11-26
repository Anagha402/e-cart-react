import React from 'react'
import Header from '../Components/Header'
import { Row,Col } from 'react-bootstrap'
import { Card,Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromWishlist } from '../../Redux/slice/wishlistSlice'
import { addToCart } from '../../Redux/slice/cartSlice'

function Wishlist() {
  const {wishlist}=useSelector(state=>state.wishlistReducer)
  const dispatch=useDispatch()

  const handleCart=(product)=>{
    dispatch(addToCart(product))
    dispatch(removeFromWishlist(product?.id))

  }
  
  
  return (
    <>
      <Header/>

      <div style={{marginTop:"50px"}} className="container-fluid">


      <Row>

        {
          wishlist?.length>0?wishlist.map(product=>(
        <Col key={product?.id}>
        <Card style={{ width: '18rem' }} className='mb-5'>
    <Link to={`/view/${product?.id}`}><Card.Img variant="top" width={"100%"} src={product?.thumbnail}/></Link>
      
      <Card.Body>
        <Card.Title className='text-danger fw-bolder'>{product?.title.slice(0,10)}...</Card.Title>
        <Card.Text>
         {product?.description.slice(0,20)}...
        </Card.Text>


        <div className="d-flex justify-content-between">
        <Button className="btn btn-light" onClick={()=>dispatch(removeFromWishlist(product?.id))}><i className="fa-solid fa-trash text-danger"></i></Button>
        <Button className="btn btn-light" onClick={()=>handleCart(product)}><i className="fa-solid fa-cart-shopping text-warning"></i></Button>

        </div>
        
      </Card.Body>
    </Card>
        </Col>)):
        <div className='text-center'>
          <img src="https://www.adanione.com/~/media/Foundation/Adani/emptyImages/empty_cart.gif" alt="" />
          <h1 className='text-danger mt-5'>Your wishlist is empty</h1>
        </div>
}
      </Row>





      </div>
    </>
  )
}

export default Wishlist
