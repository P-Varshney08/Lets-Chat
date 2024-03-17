import React, { useState } from 'react'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext()

    const signup = async({username, email, password, confirmPassword, gender}) => {
        console.log({username, email, password, confirmPassword, gender});
        const success = handleInputErrors({username, email, password, confirmPassword, gender});
        if(!success) return;
        setLoading(true);

        try {
            const res = await axios.post(' /api/auth/signup', {username, email, password, confirmPassword, gender});
            const data = res.data;
            console.log('data aa rha h: ',data);

            // localstorage m save krna h
            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return {loading, signup};
}

export default useSignup


function handleInputErrors({username, email, password, confirmPassword, gender}){
    if(!username || !email || !password || !confirmPassword || !gender) {
        toast.error('Please fill all the fields');
        return false;
    }

    if( password !== confirmPassword ) {
        toast.error('Passwords do not match')
        return false;
    }

    if(password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false;
    }
    return true;
}