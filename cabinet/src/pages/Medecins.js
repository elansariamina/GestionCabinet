import React from 'react'
import { useParams } from 'react-router-dom';
import { MEDECINS } from '../components/ListMedecins'
import MedecinCard from '../components/MedecinCard'

function Medecins() {
    const { name } = useParams();
  return (
    <div className='flex flex-wrap my-40'>
    {MEDECINS.map((medecin) => (

        medecin.speciality === name && <a href={`/patients/${medecin.id}`} key={medecin.id}>
            <div className='flex justify-center p-2'>
            <MedecinCard doctor={medecin}/>
            </div> 
            
        </a>
    ))}

</div>
  )
}

export default Medecins