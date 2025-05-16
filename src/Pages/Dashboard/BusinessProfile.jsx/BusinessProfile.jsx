import React, { useContext, useEffect, useState } from 'react';
import Form from './Form/Form';
import Inventory from './Inventory/Inventory';
import axios from 'axios';
import { AuthContext } from '../../../Providers/AuthProviders';

const BusinessProfile = () => {
    const { user } = useContext(AuthContext);
    const [isBusiness, setIsBusiness] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkBusinessStatus = async () => {
            if (!user?.email) return;

            try {
                const response = await axios.get('http://localhost:5000/business');
                const matchedBusiness = response.data.find(
                    b => b.email === user.email && b.status === 'business'
                );
                setIsBusiness(!!matchedBusiness); 
                setLoading(false);
            } catch (error) {
                console.error('Error checking business status:', error);
                setIsBusiness(false);
                setLoading(false);
            }
        };

        checkBusinessStatus();
    }, [user]);

    if (loading) return <div className="p-4">Loading...</div>;

    return (
        <div>
            {isBusiness ? <Inventory /> : <Form />}
        </div>
    );
};

export default BusinessProfile;
