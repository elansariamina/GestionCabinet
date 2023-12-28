import React from 'react';
import AssociatedRapports from "../../components/Patient/AssociatedFiles/AssociatedRapports";
import Header from "../../components/allAppComp/Header";
import Footer from "../../components/allAppComp/Footer";

const Rapports = () => {
    return (
    <div className='flex flex-col min-h-screen bg-24b6e1'>
        <Header />
        <div className='flex-grow'>
            <AssociatedRapports />
        </div>
        <Footer />
    </div>
    );
};

export default Rapports;