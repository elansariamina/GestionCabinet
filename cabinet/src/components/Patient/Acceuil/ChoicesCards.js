import React, { useState } from "react";
import Card from "./Card";
import ord from "../../../assets/style/ordonnance.jpg";
import anal from "../../../assets/style/analyse.jpg";
import dossier from "../../../assets/style/dossiers.jpg";
import info from "../../../assets/style/infos.jpg";
import DocPopUp from "./DocPopUp";
import InfoPopUp from "./InfoPopUp";
import DossierPopUp from "./DossierPopUp";

const ChoicesCard = () => {
    const [isOrdonnacePopupOpen, setIsOrdonnacePopupOpen] = useState(false);
    const [isAnnalysePopupOpen, setIsAnnalysePopupOpen] = useState(false);
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [isDossierPopupOpen, setIsDossierPopupOpen] = useState(false);

    const closeProfileePopup = () => {
        setIsProfilePopupOpen(false);
    };

    const openProfilePopup = () => {
        setIsProfilePopupOpen(true);
    };

    const closeOrdonnacePopup = () => {
        setIsOrdonnacePopupOpen(false);
    };

    const openOrdonnacePopup = () => {
        setIsOrdonnacePopupOpen(true);
    };
    const closeAnalysePopup = () => {
        setIsAnnalysePopupOpen(false);
    };

    const openAnalysePopup = () => {
        setIsAnnalysePopupOpen(true);}
    const closeDossierPopup = () => {
        setIsDossierPopupOpen(false);
    };

    const openDossierPopup = () => {
        setIsDossierPopupOpen(true);
    };
    return (
        <div className="flex justify-center">
            <a onClick={openOrdonnacePopup}>
                <Card pic={ord} name={"Ordonnances"} />
            </a>
            <a onClick={openAnalysePopup}>
                <Card pic={anal} name={"Analyses"} />
            </a>
            <a onClick={openDossierPopup}><Card pic={dossier} name={"Acomplissement de dossier"} /></a>
            <a onClick={openProfilePopup}><Card pic={info} name={"Informations Personnelles"} /></a>
            {isOrdonnacePopupOpen && <DocPopUp onclose={closeOrdonnacePopup} type={"ordonnance"} />}
            {isAnnalysePopupOpen && <DocPopUp onclose={closeAnalysePopup} type={"analyse"} />}
            {isProfilePopupOpen && <InfoPopUp onclose={closeProfileePopup}/>}
            {isDossierPopupOpen && <DossierPopUp onclose={closeDossierPopup}/>}
        </div>
    );
};

export default ChoicesCard;
