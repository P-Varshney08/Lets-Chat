import React from 'react'
import { FaSearch } from "react-icons/fa";

function SearchInput() {
  return (
    <form className='flex items-center gap-2'>
        <input
            type='text'
            placeholder='Search…'
            className='input input-bordered rounded-full'
            // value={search}
            // onChange={(e) => setSearch(e.target.value)}
		/>
        <button type='submit' className="btn btn-circle bg-yellow-500 text-white">
            <FaSearch />
        </button>
    </form>
  )
}

export default SearchInput