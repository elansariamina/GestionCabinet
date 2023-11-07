import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import MedecinCard from '../components/MedecinCard';
import axios from 'axios';


function Medecins() {
    const { name } = useParams();
    const [doctorsData, setDoctorsData] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:3000/api/doctors")
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
        medecin.spe === name && <a href={`/patients/${medecin.id}`} key={medecin.id}>
            <div className='flex justify-center p-2'>
            <MedecinCard doctor={medecin}/>
            </div> 
        </a>
    ))}

</div>
  )
}

export default Medecins