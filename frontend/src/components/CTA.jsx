import React, { act } from 'react'

const CTA = ({text, action}) => {
  return (
    <div>
      <button onClick={action}
      className='bg-[#ff0000] px-[3rem] py-[1rem] rounded-[0.5rem] font-black text-white'>
          {text}
      </button>
    </div>
  )
}

export default CTA