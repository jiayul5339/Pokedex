import React from 'react'

const Type = ({type}) => {
  return (
    <>
        <img className='typeImg' src={`../images/${type.type.name}.png`} alt='Type Icon'/>
    </>
  )
}

export default Type