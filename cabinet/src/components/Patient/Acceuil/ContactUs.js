import React from 'react';
import {FaPhoneAlt} from "react-icons/fa";
import {MdOutlineEmail} from "react-icons/md";
import {FaLocationDot} from "react-icons/fa6";

const ContactUs = () => {
    return (

            <div className='w-1/3 p-4 text-center'>
                <h2 className='text-white text-lg font-bold mb-4 font-pacifico text-center bg-cyan-700 rounded border-white border-1'>Contactez-nous!</h2>
                <p className='flex items-center text-blue-950 mb-2 font-comicSans'><FaPhoneAlt className='mr-2 text-white' /><span className='text-white font-pacifico'>Phone:</span> +1 (123) 456-7890</p>
                <p className='flex items-center text-blue-950  mb-2 font-comicSans'><MdOutlineEmail className='mr-2 text-white' /><span className='text-white font-pacifico'>Email: </span>contact@example.com</p>
                <p className='flex items-center text-blue-950 font-comicSans'><FaLocationDot className='mr-2 text-white' /><span className='text-white font-pacifico'>Address: </span>123 Street, City, Country</p>
            </div>

    );
};

export default ContactUs;