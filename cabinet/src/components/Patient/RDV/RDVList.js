import  { useState, useEffect } from 'react';
import axios from 'axios';

const RDVList = () => {
    const [rdvList, setRdvList] = useState([]);

    const apiUrl = 'http://localhost:3001/api/rdv';

    useEffect(() => {
        axios.get(apiUrl)
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
