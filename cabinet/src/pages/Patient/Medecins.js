import React from 'react';
import MedecinMap from '../../components/Patient/medecins/MedecinMap';
import Header from '../../components/allAppComp/Header';
import Footer from '../../components/allAppComp/Footer';
import TitleService from '../../components/Patient/Services/TitleService';
import { useParams } from 'react-router-dom';

function Medecins() {
    const { name } = useParams();
    return (
        <div className='flex flex-col min-h-screen bg-24b6e1'>
            <Header />
            <div className='flex-grow'>
                <TitleService title={name} />
                <MedecinMap />
            </div>
            <Footer />
        </div>
    );
}

export default Medecins;
