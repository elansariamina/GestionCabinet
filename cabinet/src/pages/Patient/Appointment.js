import React from 'react';
import Header from '../../components/allAppComp/Header';
import Footer from '../../components/allAppComp/Footer';
import Scheduler from '../../components/Patient/RDV/Scheduler';

const Appointment = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='flex-grow'>
                <Scheduler />
            </div>
            <Footer />
        </div>
    );
};

export default Appointment;
