import React from 'react'
import {SERVICES} from './ListServices';
import ServiceCard from './ServiceCard';

function ServiceMap() {

  return (
    <>
    <div className='flex flex-wrap'>
    {SERVICES.map((service) => (
        <a href={`/patients/${service.id}`} key={service.id}>
            <div className='flex justify-center p-2'>
            <ServiceCard name={service.name} />
            </div> 
        </a>
    ))}

</div>

    </>
  )
}

export default ServiceMap