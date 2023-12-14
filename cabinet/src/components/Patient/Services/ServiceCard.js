import React from 'react';
import RhumatologieImage from './../../../assets/images/services/Rhumatologie.jpg';
import EndocrinologieImage from './../../../assets/images/services/Endocrinologie.jpg';
import CardiologieImage from './../../../assets/images/services/Cardiologie.jpg';
import medecin from './../../../assets/images/medecin.jpg';

function ServiceCard({
  name
}) {
  let serviceImage;

  switch (name) {
    case 'Rhumatologie':
      serviceImage = RhumatologieImage;
      break;
    case 'Endocrinologie':
      serviceImage = EndocrinologieImage;
      break;
    case 'Cardiologie':
      serviceImage = CardiologieImage;
      break;
    default:
      serviceImage = medecin;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative px-4 py-3 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-center justify-center">
          <div className="flex-shrink-0">
            {serviceImage && <img className="italic p-4 rounded-lg w-40 h-40" src={serviceImage} alt="Service" />}
          </div>
          <div className="px-2 pb-2 text-center">
            <h5 className="italic text-lg font-semibold tracking-tight text-gray-900">{name}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
