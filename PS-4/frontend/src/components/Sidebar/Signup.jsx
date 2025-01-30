import React from 'react'
import "./signup.css"

const Signup = () => {
    return (
        <div className='fixed bottom-0 signup-bar flex px-4 py-2 justify-between items-center'>
            <div className='font-semibold'>
                <p className="uppercase">
                    Preview on Spotify
                </p>
                <p>Signup to get unlimited songs and podcasts with occasional ads. No credit card needed.</p>
            </div>
            <button className="rounded-full px-8 py-2 bg-white text-black mt-1 text-lg font-semibold">
                Sign Up Free
            </button>
        </div>
    )
}

export default Signup