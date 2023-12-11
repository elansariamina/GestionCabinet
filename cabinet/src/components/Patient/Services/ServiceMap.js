import React , { useEffect, useState } from 'react'
import ServiceCard from './ServiceCard';
import axios from 'axios';


function ServiceMap() {
  const [servicesData, setServicesData] = useState([]);
  const token = localStorage.getItem('accessToken'); 

  useEffect(() => {
    axios.get("http://localhost:3001/api/services", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
        setServicesData(response.data);
        // console.log(response.data);
    })
    .catch(error => {
      console.error("Error: ", error);
    });
  }, [])

  return (
    <>
    <div className='flex flex-wrap'>
    {servicesData.map((service) => (
        <a href={`/patients/${service.name}`} key={service.id}>
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