import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
const Signup = () => {
    const [userDetails, setUserDetails] = useState({ email: "", password: "", gender: "", username: "" })

    const onChanage = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value })
        // if (e.target.name === 'gender') {
        //     if (e.target.id === 'm') setUserDetails({ ...userDetails, gender: 'M' })
        //     if (e.target.id === 'f') setUserDetails({ ...userDetails, gender: 'F' })
        //     if (e.target.id === 'g') setUserDetails({ ...userDetails, gender: 'G' })
        // }
    }
    const {user, isAuthenticated} = useSelector((state) => state.account)
    const navigate = useNavigate()
    useEffect(() => {
        if(isAuthenticated){
            navigate('/')
        }
    })

    const registerUser = async (e) => {
        e.preventDefault()
        const { email, password, gender, username } = userDetails
        const data = JSON.stringify({ email, password, gender, username })
        console.log(data)
        const res = await fetch("http://localhost:5001/api/user/register", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: data,
        })

        const d = await res.json()
        if(d.success){
            setUserDetails({ email: "", password: "", gender: "", username: "" })
            toast.success(d.message);
            navigate('/')
            localStorage.setItem("token", JOSn.stringify(d.token))
        }
        else{
            toast.error(d.message);
        }
    }
    return (
        <>
            <div className="bg-white py-3">
                <Link to='/'><img src="/assets/black_logo.png" className='mx-auto' width={120} alt="" /></Link>
            </div>
            <div className="bg-white">
                <div className='bg-white text-black text-center w-1/2 mx-auto py-10'>
                    <h1 className='text-4xl font-bold my-12'>Sign up for free to start listening</h1>
                    <div className="border-b border-gray-500 w-3/4 mx-auto my-4"></div>
                    <form onSubmit={registerUser} className='text-center mx-auto w-1/2 py-4'>
                        <div className='w-full text-left py-4'>
                            <label htmlFor="" className='font-semibold inline-block mb-2'>What is your email</label>
                            <input type="text" id='email' name='email' value={userDetails.email} onChange={onChanage} placeholder='Enter your email' className='block w-full rounded-md border-0 transition-all duration-200 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-600 focus:ring-[2px] focus:ring-inset focus:ring-black-600 outline-none p-3 hover:ring-black bg-white' />
                        </div>
                        <div className='w-full text-left py-4'>
                            <label htmlFor="" className='font-semibold inline-block mb-2'>Create a password</label>
                            <input type="password" id='password' name='password' value={userDetails.password} onChange={onChanage} placeholder='Enter your password' className='block w-full rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-600 focus:ring-[2px] focus:ring-inset focus:ring-black-600 outline-none p-3 hover:ring-black bg-white' />
                        </div>
                        <div className='w-full text-left py-4'>
                            <label htmlFor="" className='font-semibold inline-block mb-2'>What should we call you?</label>
                            <input type="text" id='username' name='username' value={userDetails.username} onChange={onChanage} placeholder='Enter your username' className='block w-full rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-600 focus:ring-[2px] focus:ring-inset focus:ring-black-600 outline-none p-3 hover:ring-black bg-white' />
                        </div>
                        <small>It will appear on your profile</small>

                        <div className='w-full text-left py-4'>
                            <label htmlFor="" className='font-semibold inline-block mb-2'>What's your date of birth?</label>
                            <input type="date" id='dob' name='dob' className='block w-full rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-600 focus:ring-[2px] focus:ring-inset focus:ring-black-600 outline-none p-3 hover:ring-black bg-white' />
                        </div>
                        <div className='w-full text-left py-4'>
                            <label htmlFor="" className='font-semibold inline-block mb-2'>What is your gender?</label>
                            <div className="flex gap-6">
                                <input type="radio" id='m' name='gender' value='Male' onChange={onChanage} />Male
                                <input type="radio" id='f' name='gender' value='Female' onChange={onChanage} />Female
                                <input type="radio" id='g' name='gender' value='Rather not say' onChange={onChanage} />Rather not say
                            </div>
                        </div>

                        {/* button */}
                        <div className='w-full text-left py-4 flex justify-center'>
                            <input type="submit" id='submit' name='submit' className='block w-3/4 outline-none p-3 hover:scale-105 transition-all duration-200 bg-green-500 hover:bg-green-400 text-black hover:font-semibold text-center rounded-full' value="Sign up" />
                        </div>

                    </form>
                    <div className="border-b border-gray-500 w-3/4 mx-auto my-4"></div>
                    <p className='pt-8'><span className='text-black font-semibold'>Already have an account?</span> <Link to="/login" className='text-black font-semibold underline text-center hover:text-green-500'>Log in for Spotify</Link></p>
                </div>
            </div>
        </>
    )
}

export default Signup