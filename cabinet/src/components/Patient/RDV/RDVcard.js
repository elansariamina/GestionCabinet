import React, { useEffect, useState } from 'react';
import RDVList from './RDVList';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import AddRdVpopUp from "./AddRDVpop-up";
import axios from 'axios';
import Alerts from "./Alerts";

const RDVListCard = ({ time, date }) => {
    const { id_med } = useParams();
    const rdvs = RDVList()
    const [rdv, setRdv] = useState(rdvs);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const id_p = localStorage.getItem('id_p');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [hasAppointment, setHasAppointment] = useState(false);
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchRdv = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/rdv', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setRdv(response.data);
                setError('');
            } catch (error) {
                setError('Une erreur est produite!');
            }
        };

        fetchRdv();
    }, [id_med, token]);

    const openPopup = () => {
        if (hasAppointment) {
            setError("Vous avez déjà un rendez-vous avec ce médecin!");
        } else {
            setIsPopupOpen(true);
        }
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleSave = async (data) => {
        try {
            const response = await axios.post('http://localhost:3001/api/rdv', {
                date: data.date,
                time: data.time,
                id_patient: id_p,
                id_medecin: id_med,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setRdv((prevRdv) => {
                const newRdv = [...prevRdv, response.data];
                setError('');
                setMessage('Rendez-vous enregistré!');
                setHasAppointment(true);
                return newRdv;
            });
        } catch (error) {
            setError('Une erreur est produite!');
        }
    };

    useEffect(() => {
        const isToken = rdv.some((app) => {
            const appTime = app.time;
            const appDate = new Date(app.date);
            const formattedAppDate = format(appDate, 'yyyy-MM-dd');
            return app.id_medecin === id_med && appTime === time && formattedAppDate === format(date, 'yyyy-MM-dd');
        });

        if (isPopupOpen && isToken) {
            setError("Ce rendez-vous est déjà pris!");
        } else {
            setError('');
        }
    }, [id_med, time, date, rdv, isPopupOpen]);

    const cardStyle = rdv.some(app => app.id_medecin === id_med && app.time === time && format(new Date(app.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
        ? 'event bg-red-400 text-white rounded p-1 text-sm mb-1 cursor-none'
        : 'event bg-green-400 text-white rounded p-1 text-sm mb-1 cursor-pointer';

    return (
        <div className={cardStyle}>
            <button onClick={openPopup}>
                <span>Consultation à </span>
                <span>{time}</span>
            </button>
            {isPopupOpen && !rdv.some(app => app.id_medecin === id_med && app.time === time && format(new Date(app.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) && (
                <AddRdVpopUp onClose={closePopup} onSave={handleSave} date={date} time={time} />
            )}
            {error !== '' && <Alerts type={'error'} message={error} onClose={() => setError('')} />}
            {message !== '' && <Alerts type={'success'} message={message} onClose={() => setMessage('')} />}
        </div>
    );
};

export default RDVListCard;
