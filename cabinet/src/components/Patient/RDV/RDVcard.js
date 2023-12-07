import React, { useEffect, useState } from 'react';
import { RDV } from "./Rendez-vousList";
import { format } from 'date-fns';

const RdVcard = ({ time, date }) => {
    const IDMED = 2001;
    const [isToken, setIsToken] = useState(false);

    useEffect(() => {
        setIsToken(false)
        RDV.forEach(app => {
            const appTime = app.time;
            const appDate = new Date(app.date);
            const formattedAppDate = format(appDate, 'yyyy-MM-dd');

            if (app.id_medecin === IDMED && appTime === time && formattedAppDate === format(date, 'yyyy-MM-dd')) {
                setIsToken(true);
            }
        });
    }, [time, date]);

    const cardStyle = isToken
        ? 'event bg-red-400 text-white rounded p-1 text-sm mb-1 cursor-none'
        : 'event bg-green-400 text-white rounded p-1 text-sm mb-1 cursor-pointer';

    return (
        <div className={cardStyle}>
            <span >Consultation à </span>
            <span >{time}</span>
        </div>
    );
};

export default RdVcard;
