import  { useState, useEffect } from 'react';
import axios from 'axios';

const RDVList = () => {
    const [rdvList, setRdvList] = useState([]);
    const token = localStorage.getItem('accessToken');


    useEffect(() => {
        axios.get('http://localhost:3001/api/rdv', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => {
                setRdvList(response.data);
            })
            .catch(error => {
                console.error('Error during Axios request:', error);
            });
    }, []);

    return rdvList;
};

export default RDVList;
