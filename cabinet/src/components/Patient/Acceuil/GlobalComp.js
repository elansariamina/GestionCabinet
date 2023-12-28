import React, {useEffect, useState} from 'react';
import Card from "./Card";
import info from '../../../assets/style/infos.jpg'
import ord from '../../../assets/style/ordonnance.jpg'
import dossier from '../../../assets/style/dossiers.jpg'
import anal from '../../../assets/style/analyse.jpg'
import axios from "axios";
import InfoPerso from "./InfoPerso";
import ContactUs from "./ContactUs";
import DocumentTable from "./DocumentTable";
import AppointmentTable from "./AppointmentTable";
import ChoicesCard from "./ChoicesCards";

const GlobalComp = () => {
    const token = localStorage.getItem('accessToken');
    const patient = JSON.parse(localStorage.getItem('patient'));
    const [data,setData]=useState([])
    const[ordonnance,setOrdonnance]=useState({})
    const[analyse,setAnalyse]=useState({})
    const[analMed,setAnalMed]=useState('')
    const[ordMed,setOrdMed]=useState('')

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/rdv/patientDocInfo/${patient._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const appointments = response.data;
                appointments.sort((a, b) => {
                    const dateA = new Date(a.date + ' ' + a.time);
                    const dateB = new Date(b.date + ' ' + b.time);
                    return dateA - dateB;
                });

                const upcomingAppointment = appointments.find(
                    (appointment) => new Date(appointment.date + ' ' + appointment.time) > new Date()
                );

                setData(upcomingAppointment ? [upcomingAppointment] : []);
            })
            .catch((appointmentsError) => {
                console.error('Error getting appointments:', appointmentsError);
            });
        axios.get(`http://localhost:3001/api/doctors/medDoc/${patient._id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                const doc = response.data;

                const newestOrdonnance = doc
                    .filter(item => item.type === 'ordonnance')
                    .reduce((prev, current) => (new Date(current.date) > new Date(prev.date) ? current : prev));

                const newestAnalyse = doc
                    .filter(item => item.type === 'analyse')
                    .reduce((prev, current) => (new Date(current.date) > new Date(prev.date) ? current : prev));


                setOrdonnance(newestOrdonnance ? [newestOrdonnance] : {});
                setAnalyse(newestAnalyse ? [newestAnalyse] : {});

            })
            .catch(docError => {
                console.error('Error getting appointments:', docError);
            });





        if(analyse.length>0) {
                    setAnalMed(analyse[0].doctorId.name);
        }
        if(ordonnance.length>0) {
                    setOrdMed(ordonnance[0].doctorId.name);
        }
    }, [token, patient,data,analyse,ordonnance]);
    const downloadFile = (data, fileName, fileType) => {
        const blob = new Blob([new Uint8Array(data.data)], { type: fileType });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
    };

    return (
    <div className='bg-24b6e1 border-2 border-white rounded-2xl m-3'>
        <InfoPerso/>
        <ChoicesCard/>
        <div className='bg-24b6e1 border-2 border-white rounded-2xl m-3'>
            <div className='flex justify-between '>

                <DocumentTable
                    documents={ordonnance}
                    title='Ordonnance'
                    downloadHandler={(doc) => downloadFile(doc.content, 'ordonnance.pdf', 'application/pdf')}
                    medecin={ordMed}
                />

                <DocumentTable
                    documents={analyse}
                    title='Analyse'
                    downloadHandler={(doc) => downloadFile(doc.content, 'analyse.pdf', 'application/pdf')}
                    medecin={analMed}
                />
            </div>
            <div className='flex justify-between '>
                <AppointmentTable data={data}/>
                <ContactUs/></div>
        </div>
    </div>
    );
};

export default GlobalComp;
