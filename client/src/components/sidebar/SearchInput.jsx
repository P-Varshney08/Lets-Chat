import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/useConversation';
import useGetConversation from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';

function SearchInput() {
  const [search, setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 3) {
      return toast.error('Search text must be 3 characters long');
    }

    const conversation = conversations.find((c) => c.username.toLowerCase().includes(search.toLowerCase()));
    if(conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else{
      toast.error('No such user found!');
    }
  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input
            type='text'
            placeholder='Search…'
            className='input input-bordered rounded-full'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
		    />
        <button type='submit' className="btn btn-circle bg-yellow-500 text-white">
            <FaSearch />
        </button>
    </form>
  )
}

export default SearchInput