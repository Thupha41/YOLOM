import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserData = () => {
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const authToken = localStorage.getItem('auth-token');
                if (!authToken) {
                    setUsername('');
                    return;
                }

                const response = await axios.get('https://api.yourrlove.com/v1/web/users/me', {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                if (response.data.statusCode >= 200 && response.data.statusCode < 300) {
                    setUsername(response.data.metadata.name);
                } else {
                    setUsername(''); 
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setUsername('');
            }
        };
        
        fetchUserData();
    }, []);

    return username;
};

export default useUserData;
