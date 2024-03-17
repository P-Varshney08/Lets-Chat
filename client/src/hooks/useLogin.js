import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import {useNavigate} from 'react-router-dom'

const useLogin = () => {
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();
    const login = async (username, password) => {
        console.log({username, password});
        const success = handleInputErrors({username, password});
        if(!success) return;
        setLoading(true);

        try {
            console.log(`password is: ${password}`);
            const res = await axios.post('/api/auth/login',  { username, password });
            // console.log(`login hook m response status aaya h- ${res.status}`);
            const data = res.data;
            console.log(`login hook m data aaya h ${JSON.stringify(data)}`)
            if(data.error) {
                throw new Error(data.error);
            }
            setAuthUser(data);
            navigate('/');
            localStorage.setItem("chat-user", JSON.stringify(data));
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return {loading, login}
}

export default useLogin



function handleInputErrors({username, password}){
    if(!username || !password ) {
        toast.error('Please fill all the fields');
        return false;
    }
    return true;
}