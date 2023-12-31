import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MedecinCard from './MedecinCard';
import axios from 'axios';


function MedecinMap() {
    const { name } = useParams();
    const [doctorsData, setDoctorsData] = useState([]);
    const token = localStorage.getItem('accessToken'); 

    useEffect(() => {
      axios.get("http://localhost:3001/api/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
          setDoctorsData(response.data);
          // console.log(response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
    }, [])
  return (
    <div className='flex flex-wrap m-40'>
    {doctorsData.map((medecin,index) => (
        medecin.spe === name &&
            <div className='flex justify-center p-2'>
            <MedecinCard key={index} doctor={medecin}/>
            </div>
    ))}

    </div>
  )
}

export default MedecinMap