import React from 'react'
import './Card.css'
import { FaPause, FaPlay } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { playSong, pauseSong} from '../../states/actors/songActor'
import { useGlobalContext } from '../../states/Context'


const Card = ({song, idx}) => {
  const {masterSong, isPlaying} = useSelector((state) => state.mainSong)
  const {resetEverything, setSongIdx} = useGlobalContext()
  const dispatch = useDispatch()
  
  const handlePlay = (song) => {
    setSongIdx(idx)
    if(isPlaying){
      masterSong.mp3.currentTime = 0
      masterSong.mp3.pause()
      resetEverything()
    }
    dispatch(playSong(song))
  }

  const handlePause = () => {
    console.log("first")
    dispatch(pauseSong())
  }

  return (
    song && (
      <div className='card col-span-1 p-4 rounded-lg hover:'>
        <div className="relative h-[75%] w-full">
        <img src={song.img} alt="" className='image-fit rounded-sm'/>
        {
          masterSong.id === song.id && isPlaying
          ? (
            <button onClick={handlePause} className='play_btn flex justify-center absolute bottom-0 right-0 rounded-full items-center bg-green-600 p-3'>
            <FaPause className='text-black text-xl' />
            </button>
            ) : (
            <button onClick={() => handlePlay(song)} className='play_btn flex justify-center absolute bottom-0 right-0 rounded-full items-center bg-green-600 p-3'>
            <FaPlay className='text-black text-xl' />
            </button>
            )}
        
        </div>
        <h3 className='text-sm font-semibold my-2'>{song.title}</h3>
        <p className='text-xs text-gray-400 leading-4'>{song.artist}</p>
    </div>
    )
  )
}

export default Card


// Stopped at 17:35 Tuotorial 7