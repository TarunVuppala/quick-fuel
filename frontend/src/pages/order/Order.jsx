import React from 'react'
import {Link} from 'react-router-dom'

const Order = () => {
  return (
    <div>
      <button><Link to='/booking'>Fuel Booking</Link></button>
      <br />
      <button><Link to='/mbooking'>Repair Booking</Link></button>

    </div>
  )
}

export default Order