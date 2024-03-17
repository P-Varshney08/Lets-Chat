import axios from 'axios';
import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

function useLogout() {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext();

  const logout = async() => {
    setLoading(true);
    try {
        const res = await axios.get("/api/auth/logout");
        const data = res.data;
        console.log(`Our data is: ${JSON.stringify(data)}`);
        if(data.error) {
            throw new Error(data.error);
        }
        localStorage.removeItem("chat-user");
        setAuthUser(null);
    } catch (error) {
        toast.error(error.message);        
    } finally {
        setLoading(false);
    }
  }
  return {loading, logout};
}

export default useLogout