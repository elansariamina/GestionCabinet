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
          console.log(response.data);
      })
      .catch(error => {
        console.error("Error: ", error);
      });
    }, [])
  return (
    <div className='flex flex-wrap my-40'>
    {doctorsData.map((medecin) => (
        medecin.spe === name && 
        <a href={`/patients/${medecin.id}`} key={medecin.id}>
            <div className='flex justify-center p-2'>
            <MedecinCard doctor={medecin}/>
            </div> 
        </a>
    ))}

</div>
  )
}

export default MedecinMap