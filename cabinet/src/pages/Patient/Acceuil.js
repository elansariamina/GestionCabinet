import React, { useEffect, useState } from 'react';
import Services from '../../components/Patient/Services/Services';
import Header from "../../components/allAppComp/Header";
import Footer from "../../components/allAppComp/Footer";
import Greetings from "../../components/Patient/Acceuil/greetings";
import GlobalComp from "../../components/Patient/Acceuil/GlobalComp";
import Notifications from "../../components/Patient/Acceuil/Notifications";

function Acceuil() {
    const [isOpenAlert, setOpenAlert] = useState(false);

    const closeAlertPopup = () => {
        setOpenAlert(false);
    };

    const openAlertPopup = () => {
        setOpenAlert(true);
    };

    useEffect(() => {
        const alreadyDisplayed = localStorage.getItem('acceuilComponentDisplayed');

        if (!alreadyDisplayed) {
            openAlertPopup();
            localStorage.setItem('acceuilComponentDisplayed', 'true');
        }
    }, []);

    return (
        <div className='bg-24b6e1'>
            <Header />
            <Greetings />
            <Services />
            <GlobalComp />
            <Footer />
            {isOpenAlert && <Notifications onClose={closeAlertPopup} />}
        </div>
    );
}

export default Acceuil;
