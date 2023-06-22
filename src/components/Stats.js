import React from 'react'

const Stats = ({stats, formatString}) => {
  return (
    <section className='stats'>
        <h2>{formatString(stats.stat.name)}</h2>
        <h2 style={{color: 
            stats.base_stat >= 90 ? "green" : 
            stats.base_stat > 50 ? "grey" : "red"}}>
                
            {stats.base_stat}
        </h2>
    </section>
  )
}

export default Stats