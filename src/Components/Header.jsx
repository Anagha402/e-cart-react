import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import { searchProduct } from '../../Redux/slice/productSlice';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function Header({insideHome}) {
  const dispatch=useDispatch()
  const[wishlistCount,setWishlistCount]=useState(0)
  const[cartCount,setCartCount]=useState(0)
  const {wishlist}=useSelector(state=>state.wishlistReducer)
  const cart=useSelector((state)=>state.cartReducer)
  
  
  useEffect(()=>{
    setWishlistCount(wishlist.length)
    setCartCount(cart.length)



  },[wishlist,cart])
  return (
    <>
    <Navbar expand="lg" className="bg-success">
      <Container>
        <Navbar.Brand > <Link to={'/'} style={{color:"darkblue", textDecoration:"none", fontSize:"30px",fontWeight:"700"}}><i class="fa-solid fa-cart-shopping fa-bounce"></i>E-Cart</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* search bar */}
        {insideHome&&<Form.Control
              type="text"
              placeholder="Search"
              className=" ms-5 w-25"
              onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))}
            />}
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link className='btn btn-outline-light '>
            <Link to={'/wishlist'} style={{color:"black", fontWeight:"bold", textDecoration:"none"}}><i className="fa-solid fa-heart text-danger mx-1"style={{color:"red"}}></i>Wishlist<Badge bg="info ms-2">{wishlistCount}</Badge></Link>
            </Nav.Link>
            <Nav.Link className='btn btn-outline-light'>
            <Link to={'/cart'} style={{color:"black", fontWeight:"bold", textDecoration:"none"}}><i className="fa-solid fa-cart-shopping  mx-1"style={{color:"brown"}}></i>Cart<Badge bg="info ms-2">{cartCount}</Badge></Link>
            
            </Nav.Link>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
      
    </>
  )
}

export default Header
