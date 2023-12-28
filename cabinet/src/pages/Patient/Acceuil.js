import React from 'react';
import Services from '../../components/Patient/Services/Services';
import Header from "../../components/allAppComp/Header";
import Footer from "../../components/allAppComp/Footer";
import Greetings from "../../components/Patient/Acceuil/greetings";
import GlobalComp from "../../components/Patient/Acceuil/GlobalComp";


function Acceuil() {
    return (
        <div className='bg-24b6e1'>
            <Header />
            <Greetings />
            <Services />
            <GlobalComp/>
            {/*<RDVs />*/}
            {/*<Notifications />*/}
            <Footer />
        </div>
    );
}

export default Acceuil;
