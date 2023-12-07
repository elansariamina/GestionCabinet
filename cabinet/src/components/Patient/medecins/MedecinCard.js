import React from 'react'
import Img from "./../../../assets/images/medecin.jpg";

function MedecinCard({doctor}) {
  return (
    <>
    <div class="mx-10 grid place-content-center">
        <div class="bg-white py-8 px-10 text-center rounded-lg shadow-lg transform -translate-y-20 sm:-translate-y-24 max-w-xs mx-auto">
            <h2 class="font-semibold text-2xl mb-6">{doctor.name}</h2>
            <img class="w-20 h-20 object-cover rounded-full mx-auto shadow-lg" src={Img} alt="User avatar"></img>
            <p class="capitalize text-xl mt-1">{doctor.service}</p>
            <span class="flex items-center border rounded-full w-36 pr-2 justify-center mx-auto mt-2 mb-2"><div class="bg-green-400 rounded-full w-2.5 h-2.5 block mr-2"></div>{doctor.phoneNumber}</span>
            <span class="flex items-center border rounded-full w-52 pr-2 justify-center mx-auto mt-2 mb-2"><div class="bg-pink-400 rounded-full w-2.5 h-2.5 block mr-2"></div>{doctor.email}</span>
            <span class="flex items-center border rounded-full w-48 pr-2 justify-center mx-auto mt-2 mb-2"><div class="bg-yellow-400 rounded-full w-2.5 h-2.5 block mr-2"></div>{doctor.address}</span>
            <a href="/appointment"><button class="rounded-lg bg-gradient-to-r bg-blue-400 text-lg text-white font-bold pt-2 pb-2 px-4 inline">Prendre RDV</button></a>
        </div>
    </div>
    </>
    
  )
}

export default MedecinCard