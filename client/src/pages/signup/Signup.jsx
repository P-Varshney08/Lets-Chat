import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

function Signup() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });
  const {loading, signup} = useSignup();

  const handleCheckBoxChange = (gender) => {
    setInputs({...inputs, gender});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  }

  return (
    <div className='flex flex-col items-center justify-center min-w-96'>
        <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <h1 className='text-3xl font-semibold text-center text-gray-500'>
                Signup
                <span className='text-green-800'> ChatApp</span>
            </h1>

            <form onSubmit={handleSubmit}>
                {/* Uesrname input */}
                <div>
                    <label className='label p-2 '>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input
                        type='text'
                        placeholder='priyavarshney'
                        className='w-full input input-bordered h-10'
                        value={inputs.username}
                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                    />
                </div>

                {/* Email ID input */}
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Email ID</span>
                    </label>
                    <input
                        type='email'
                        placeholder='priyavarshney@gmail.com'
                        className='w-full input input-bordered  h-10'
                        value={inputs.email}
                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                    />
                </div>

                {/* Passsword input */}
                <div>
                    <label className='label'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input
                        type='password'
                        placeholder='Enter Password'
                        className='w-full input input-bordered h-10'
                        value={inputs.password}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    />
                </div>

                {/* Confirm Password input */}
                <div>
                    <label className='label'>
                        <span className='text-base label-text'>Confirm Password</span>
                    </label>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        className='w-full input input-bordered h-10'
                        value={inputs.confirmPassword}
                        onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                    />
                </div>

                {/* Gender checkbox */}
                <GenderCheckbox onCheckboxChange={handleCheckBoxChange} selectedGender={inputs.gender} />

                <Link to='/login' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                    Already have an account ?
                </Link>

                <div>
                    <button className='btn btn-block btn-sm mt-2' disabled={loading}>
                        {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup






// import React from 'react'
// import GenderCheckbox from './GenderCheckbox'

// function Signup() {
//   return (
//     <div className='flex flex-col items-center justify-center min-w-96'>
//         <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//             <h1 className='text-3xl font-semibold text-center text-gray-500'>
//                 Signup
//                 <span className='text-green-800'> ChatApp</span>
//             </h1>

//             <form>
//                 <div>
//                     <label className='label p-2 '>
//                         <span className='text-base label-text'>Username</span>
//                     </label>
//                     <input
//                         type='text'
//                         placeholder='priyavarshney'
//                         className='w-full input input-bordered h-10'
//                         // value={inputs.username}
//                         // onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
//                     />
//                 </div>

//                 <div>
//                     <label className='label p-2'>
//                         <span className='text-base label-text'>Email ID</span>
//                     </label>
//                     <input
//                         type='email'
//                         placeholder='priyavarshney@gmail.com'
//                         className='w-full input input-bordered  h-10'
//                         // value={inputs.email}
//                         // onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
//                     />
//                 </div>

//                 <div>
//                     <label className='label'>
//                         <span className='text-base label-text'>Password</span>
//                     </label>
//                     <input
//                         type='password'
//                         placeholder='Enter Password'
//                         className='w-full input input-bordered h-10'
//                         // value={inputs.password}
//                         // onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
//                     />
//                 </div>

//                 <div>
//                     <label className='label'>
//                         <span className='text-base label-text'>Confirm Password</span>
//                     </label>
//                     <input
//                         type='password'
//                         placeholder='Confirm Password'
//                         className='w-full input input-bordered h-10'
//                         // value={inputs.confirmPassword}
//                         // onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
//                     />
//                 </div>

//                 {/* Gender checkbox */}
//                 <GenderCheckbox />

//                 <a href="#" className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
//                     Already have an account ?
//                 </a>

//                 <div>
//                     <button className='btn btn-block btn-sm mt-2'>Signup</button>
//                 </div>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default Signup