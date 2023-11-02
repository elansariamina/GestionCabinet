import React from 'react'
import service from './../assets/images/medecin.jpg';

function ServiceCard({
    name
}) {
    const handleClick = ()=>{
        console.log("test");
    }
  return (
    <div className='flex justify-inline'>
        <button onClick={handleClick}>
            <div className="w-60 h-80 max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
            <img className="p-8 rounded-lg w-60 h-60" src={service} alt="product" ></img>
            <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">{name}</h5>
            </div>
            </div>
        </button>
    </div>
  )
}

export default ServiceCard