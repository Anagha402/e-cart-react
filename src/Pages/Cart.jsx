import React, { useEffect, useState } from 'react'
import Header from "../Components/Header"
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart } from '../../Redux/slice/cartSlice'
import { Link } from 'react-router-dom'


function Cart() {
  const cart=useSelector((state)=>state.cartReducer)
  const dispatch=useDispatch()
  const [total, setTotal]=useState(0)


  useEffect(()=>{

    if(cart?.length>0){
      setTotal(cart?.map(product=>product?.totalPrice).reduce((p1,p2)=>p1+p2))

    }else{
      setTotal(0)

    }


  },[cart])

  return (
    <>
     <Header/>
     {
      cart.length>0?(

      
    <div style={{marginTop:"100px"}} className="row container">
      <div className="col-lg-1"></div>
      <div className="col-lg-7">
        <div className="table shadow mt-5">
          <table className='w-100'>
            <thead>
            <tr>
              <th className='mx-3'>#</th>
              <th>Title</th>
              <th>Image</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
            </thead>

            <tbody>
              {
                cart?.map((product,index)=>(
            <tr>
              <td>{index+1}</td>
              <td>{product.title}</td>
              <td><img src={product.thumbnail} width={'70%'} height={'200px'}alt="" /></td>
              <td><input type="text" readOnly value={product.quantity} style={{width:"25px"}} /></td>
              <td>${product.totalPrice}</td>
              <td><button className='btn text-danger ' onClick={()=>dispatch(removeFromCart(product?.id))}><i class="fa-solid fa-trash"></i></button></td>
            </tr>))
            }
            </tbody>
          </table>
      <div className="d-flex  justify-content-between p-3 ">
        <button className='btn btn-danger' onClick={()=>dispatch(emptyCart())}>Empty Cart</button>
        <Link to={'/'} className='btn btn-info'>Shop More</Link> 
      </div>

        </div>
      </div>


      <div className="col-lg-1"></div>
      <div className="col-lg-3">
        <div className="card shadow rounded mt-5 p-5 w-100">
          <h2 className='text-dark fw-bolder'>Cart Summary</h2>
          <h3><span className='text-dark fw-bolder'>Total Products : </span>3</h3>
          <h3>Total Price : <span className='text-danger fw-bolder'>${total.toFixed(2)}</span></h3>
         

        </div>
        <div className="d-grid">
            <button className='btn btn-success mt-2'>Checkout</button>
          </div>
        
      </div>

      

    </div>): <div className='text-center'>
          <img src="https://www.adanione.com/~/media/Foundation/Adani/emptyImages/empty_cart.gif" alt="" />
          <h1 className='text-danger mt-5'>Your cart is empty</h1>
        </div>
    }
      
      
    </>
  )
}

export default Cart
