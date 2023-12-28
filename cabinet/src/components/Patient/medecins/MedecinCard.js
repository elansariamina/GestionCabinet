import React from 'react';
import Img from './../../../assets/images/medecin.jpg';
import { FaPhoneAlt } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';

function MedecinCard({ doctor }) {
    return (
        <div className=' grid place-content-center w-82'>
            <div className='bg-gray-100 border-2 border-white rounded-2xl p-4 text-center shadow-lg transform -translate-y-20 sm:-translate-y-24 max-w-xs mx-auto'>
                <h2 className='font-pacifico text-blue-900 text-2xl mb-6'>{doctor.name}</h2>
                <p className='capitalize text-xl mt-1'>{doctor.service}</p>
                <div className='text-#5ab1d0 font-comicSans'>
          <span className='flex items-center mb-2'>
            <FaPhoneAlt className='mr-2 text-cyan-700' />
              {doctor.phoneNumber}
          </span>
                    <span className='flex items-center mb-2'>
            <MdOutlineEmail className='mr-2 text-cyan-700' />
                        {doctor.email}
          </span>
                    <span className='flex items-center'>
            <FaLocationDot className='mr-2 text-cyan-700' />
                        {doctor.address}
          </span>
                </div>
                <a href={'/appointment/' + doctor._id}>
                    <button className=' mt-4 rounded-lg bg-24b6e1 text-lg text-white font-chalkduster old pt-2 pb-2 px-4 inline'>
                        Prendre RDV
                    </button>
                </a>
            </div>
        </div>
    );
}

export default MedecinCard;
