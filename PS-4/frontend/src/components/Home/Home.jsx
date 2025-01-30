import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import { FaAngleLeft, FaAngleRight, FaSearch, FaUser } from 'react-icons/fa'
import Card from '../Card/Card'
import { Link, Navigate } from 'react-router-dom'
import SongBar from '../MasterBar/SongBar'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { userActor } from '../../states/actors/userActor'


export const songs = [
  {
    // id: Math.random() * Date.now(),
    id: 1,
    title: "Besharam Rang",
    img: "/assets/besharam.jpg",
    artist: "Deepika",
    mp3: new Audio("/assets/Besharam_Rang.mp3")
  },
  {
    // id: Math.random() * Date.now(),
    id: 2,
    title: "Can You Hear",
    img: "/assets/Can_You_Hear.jpg",
    artist: "Oppenheimier",
    mp3: new Audio("/assets/Can_You_Hear_The_Music.mp3")
  },
  {
    // id: Math.random() * Date.now(),
    id: 3,
    title: "Jhoome Jo Pathan",
    img: "/assets/jhoome.jpg",
    artist: "Shah Rukh Khan",
    mp3: new Audio("/assets/Jhoome_Jo_Pathaan.mp3")
  },
  {
    // id: Math.random() * Date.now(),
    id: 4,
    title: "Kusu Kusu",
    img: "/assets/kusu.jpg",
    artist: "Nora Fateih",
    mp3: new Audio("/assets/Kusu_Kusu.mp3")
  },
  {
    // id: Math.random() * Date.now(),
    id: 5,
    title: "Aalas Ka Pedh",
    img: "/assets/AalaskaPedh.jpg",
    artist: "Local Train",
    mp3: new Audio("/assets/Aalas_Ka_Pedh.mp3")
  },
  {
    // id: Math.random() * Date.now(),
    id: 6,
    title: "Nadiyon Paar",
    img: "/assets/nadiyon.jpg",
    artist: "Someone nice",
    mp3: new Audio("/assets/Nadiyon_Paar.mp3")
  },
  {
    // id: Math.random() * Date.now(),
    id: 7,
    title: "What Jhumka",
    img: "/assets/jhumka.jpg",
    artist: "Someone nice",
    mp3: new Audio("/assets/What_Jhumka.mp3")
  },
  {
    // id: Math.random() * Date.now(),
    id: 8,
    title: "Night Changes",
    img: "/assets/NightChnages.jpg",
    artist: "One Direction",
    mp3: new Audio("/assets/NightChnages.mp3")
  },
]


const Home = () => {
  const { user, isAuthenticated } = useSelector((state) => state.account)
  const dispatch = useDispatch()

  const getUser = async () => {
    const token = JSON.parse(localStorage.getItem("token"))
    if (token) {
      const res = await fetch("http://localhost:5001/api/user/me", {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          token,
        },
      })

      const d = await res.json()
      if (d.success) {
        //toast.success(d.message);
        dispatch(userActor(d.user))
      }
      else {
        toast.error(d.message);
      }
    }
  }
  useEffect(() => {
    getUser()
  }, [])

  return (
    <Layout>
      <div className="flex justify-between mx-4 items-center my-5 border-b-2 border-b-white/40 rounded-md">
        <div className='flex items-center gap-2 w-1/2'>
          <FaAngleLeft className='bg-white/10 rounded-full text-4xl p-1' />
          <FaAngleRight className='bg-white/10 rounded-full text-4xl p-1' />
          <div className='w-full text-left py-4 relative ml-3'>
            <input type="text" id='username' name='username' placeholder='Search for a song' className='block w-full rounded-full border-0 text-gray-300 shadow-sm placeholder:text-gray-600 focus:ring-[1px] focus:ring-inset focus:ring-white-600 outline-none p-3 bg-[#1a1919] pl-12' />
            <FaSearch className='absolute top-8 left-3'/>
          </div>
        </div>
        <div>
          {!isAuthenticated ? (
            <div>
              <Link to={'/signup'} className="rounded-full px-8 py-2 text-white mt-4 text-base font-semibold">
                Sign up
              </Link>
              <Link to={'/login'} className="rounded-full px-8 py-3 bg-white text-black mt-4 text-base font-semibold">
                Log in
              </Link>
            </div>
          ) : <FaUser className="text-2xl mr-5" />}

        </div>
      </div>


      <div className='tertiary_bg p-4 mx-4 rounded-lg'>
        <div className="flex justify-between item-center px-2 py-1 mt-5 my-4">
          <span className='text-2xl font-semibold hover:underline'>Focus</span>
          <span className='text-gray-400 font-semibold hover:underline'>Show all</span>
        </div>
        <div className='grid grid-cols-5 gap-5'>
          {songs.map((song, i) => {
            return <Card key={song.id} idx={i} song={song} />
          })}
        </div>

        <div className="flex justify-between item-center px-2 py-1 mt-5 my-4">
          <span className='text-2xl font-semibold hover:underline'>Spotify Playlists</span>
          <span className='text-gray-400 font-semibold hover:underline'>Show all</span>
        </div>
        <div className='grid grid-cols-5 gap-5'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <SongBar />
    </Layout>
  )
}

export default Home

