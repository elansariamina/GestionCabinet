import React from 'react'
import { useParams } from 'react-router-dom';

function Medecins() {
  const { id } = useParams();

  return (
    <div>Medecins de l'id service : {id}</div>
  )
}

export default Medecins