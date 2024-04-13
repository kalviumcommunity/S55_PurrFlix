import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                await axios.post('https://s55-purrflix-1.onrender.com/logout');
                navigate('/login');
            } catch (error) {
                console.error('Error logging out:', error);
                window.alert('Error logging out. Please try again.');
            }
        };

        logout();
    }, [navigate]);

    return null;
};

export default Logout;
