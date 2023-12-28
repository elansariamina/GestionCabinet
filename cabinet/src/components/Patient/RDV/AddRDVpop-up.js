import React, {useEffect, useState} from 'react';
import { format, parse } from 'date-fns';
import {useNavigate} from "react-router-dom";

const AddRdVpopUp = ({ onClose, onSave, date, time,data }) => {
    const parsedTime = parse(time, 'HH:mm', new Date());

    const formattedDate = format(date, 'yyyy-MM-dd');
    const formattedTime = format(parsedTime, 'HH:mm');
    const navigate = useNavigate();
    const [ob, setOb] = useState(data);

    const handleSave = () => {
        onSave({ date: formattedDate, time: formattedTime });
        onClose();
        navigate(`/rapports?requestData=${JSON.stringify({ ...ob, date: formattedDate, time: formattedTime })}`);
    };

    useEffect(() => {
        setOb({
            ...data,
            date: formattedDate,
            time: formattedTime,
        });
    }, [data, formattedDate, formattedTime]);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-50"></div>
            <div className="relative bg-white p-6 rounded-md shadow-md z-10">
                <h2 className="text-2xl font-pacifico mb-5 text-#26a7cc">Prendre un rendez-vous : </h2>
            <div className="flex items-center mb-3 justify-center">
                <span className="text-xl leading-relaxed text-gray-500 mr-2">Date :</span>
                <span className="text-xl  text-blue-900 justify-center">{formattedDate}</span>
            </div>
            <div className="flex items-center mb-7 justify-center">
                <span className="text-xl  leading-relaxed text-gray-500 mr-2">Heure :</span>
                <span className="text-xl  text-blue-900 justify-center">{formattedTime}</span>
            </div>
            <div className="flex justify-center space-x-4">
                <button
                    className="bg-#26a7cc text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    onClick={handleSave}
                >
                    Enregistrer
                </button>
                <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    onClick={onClose}
                >
                    Annuler
                </button>
            </div>
            </div></div>
    );
};

export default AddRdVpopUp;
