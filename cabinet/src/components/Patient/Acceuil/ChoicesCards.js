import React, { useState } from "react";
import Card from "./Card";
import ord from "../../../assets/style/ordonnance.jpg";
import anal from "../../../assets/style/analyse.jpg";
import dossier from "../../../assets/style/dossiers.jpg";
import info from "../../../assets/style/infos.jpg";
import DocPopUp from "./DocPopUp";

const ChoicesCard = () => {
    const [isOrdonnacePopupOpen, setIsOrdonnacePopupOpen] = useState(false);
    const [isAnnalysePopupOpen, setIsAnnalysePopupOpen] = useState(false);
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

    return (
        <div className="flex justify-center">
            <a onClick={openOrdonnacePopup}>
                <Card pic={ord} name={"Ordonnances"} />
            </a>
            <a onClick={openAnalysePopup}>
                <Card pic={anal} name={"Analyses"} />
            </a>
            <Card pic={dossier} name={"Acomplissement de dossier"} />
            <Card pic={info} name={"Informations Personnelles"} />
            {isOrdonnacePopupOpen && <DocPopUp onclose={closeOrdonnacePopup} type={"ordonnance"} />}
            {isAnnalysePopupOpen && <DocPopUp onclose={closeAnalysePopup} type={"analyse"} />}
        </div>
    );
};

export default ChoicesCard;
