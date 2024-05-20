import React from 'react'
import CartItems from '../../components/CartItems/CartItems'
import Newsletter from '../../components/NewSletters/Newsletter'
const Cart = () => {
  return (
    <div className='bg-slate-50'>
      <CartItems/>
      <Newsletter/>
    </div>
  )
}

export default Cart