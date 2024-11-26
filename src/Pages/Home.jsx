import React, { useEffect } from 'react'
import { Button, Col,Row} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/slice/productSlice';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Header from "../Components/Header"
import { useState } from 'react';
import { addToWishlist } from '../../Redux/slice/wishlistSlice';
import { addToCart } from '../../Redux/slice/cartSlice';



function Home() {
  const dispatch=useDispatch()
  const{allproducts,loading,error}=useSelector(state=>state.productReducer)
  const {wishlist}=useSelector(state=>state.wishlistReducer)
  
  const cart=useSelector((state)=>state.cartReducer)
  

  useEffect(()=>{
    dispatch(fetchProducts())

  },[])


//copy pasted from view.jsx
  const handleWishlist=(product)=>{
    const existingProduct=wishlist.find(item=>item.id==product.id)
    if(existingProduct){
      alert("product already exist")
    }else{
      //alert("product added to wishlist")
      dispatch(addToWishlist(product))
    }
  }

  const handleCart=(product)=>{

    const existingProduct= cart?.find(item=>item.id==product.id)

    if(existingProduct){
      alert("items added")
      dispatch(addToCart(product))
    }else{
      alert("item added")
      dispatch(addToCart(product))
    }
  }

  return (
    <>
     <Header insideHome/>
    <div style={{marginTop:"50px"}} className="container-fluid">
      {
      loading? <div className="text-center mt-5">
         <Spinner animation="border" variant="success" />

      </div>:
     
      
  <Row className='ms-5 '>
  { allproducts?.length>0?allproducts.map(product=>(

<Col key={product?.id}>
    <Card style={{ width: '18rem' }} className='mb-5'>
    <Link to={`/view/${product?.id}`}><Card.Img variant="top" width={"100%"} src={product?.thumbnail}/></Link>
      
      <Card.Body>
        <Card.Title className='text-danger fw-bolder'>{product?.title.slice(0,10)}...</Card.Title>
        <Card.Text>
         {product?.description.slice(0,20)}...
        </Card.Text>


        <div className="d-flex justify-content-between">
        <Button className="btn "style={{backgroundColor:"aquamarine",border:"none",color:"red"}} onClick={()=>handleWishlist(product)}><i className="fa-solid fa-heart"></i></Button>
        <Button className="btn "style={{backgroundColor:"aquamarine",border:"none",color:"blue"}} onClick={()=>handleCart(product)}><i className="fa-solid fa-cart-shopping"></i></Button>

        </div>
        
      </Card.Body>
    </Card>
    </Col>
  )): <p className='text-danger'>Nothing to Display</p>
    }
  </Row>}
    </div> 
     
      
    </>
  )
}

export default Home
