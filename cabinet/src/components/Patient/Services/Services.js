import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';
import axios from 'axios';

function Services() {
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
        <div className='bg-24b6e1'>
            <div className='flex items-center justify-center text-white p-4'>
                <hr className="border-b-2 border-white w-1/4 " />
                <h2 className="text-xl font-chalkduster">Nos Services</h2>
                <hr className="border-b-2 border-white w-1/4 " />
            </div>
            <div className='flex justify-center'>
                {servicesData.map((service) => (
                    <a href={`/patients/${service.name}`} key={service.id} className="mx-2">
                        <div className='p-4'>
                            <ServiceCard key={service._id} name={service.name} />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default Services;
