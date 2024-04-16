import React from 'react'
import "./style.css";

const Indicator = ({ title, view }: any) => {
  return (
    <div className='indicator'>
      <h2>{title}</h2>
      <h2>{view}</h2>
    </div>
  )
}

export default Indicator;