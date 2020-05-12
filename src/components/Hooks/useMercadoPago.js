import {useState} from 'react';

export const useMercadoPago = () => {
    const [mpData, setMpData] = useState(null);
    return {
       mpData,
       setMpData
    }
 }